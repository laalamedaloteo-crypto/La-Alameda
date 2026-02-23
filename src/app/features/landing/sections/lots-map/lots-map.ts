import {
  Component,
  EventEmitter,
  Input,
  Output,
  signal,
  OnChanges,
  SimpleChanges,
  OnDestroy,
} from '@angular/core';
import { DecimalPipe } from '@angular/common';
import * as L from 'leaflet';
import { LeafletModule } from '@bluehalo/ngx-leaflet';
import 'leaflet-draw';

import { Lot } from '../../../../core/services/lots-api';
import { UiModal } from '../../../../shared/ui/modal/modal';
import { UiBadge } from '../../../../shared/ui/badge/badge';
import { UiButton } from '../../../../shared/ui/button/button';

type LotLayer = L.Polygon & { __lotId?: string };

@Component({
  selector: 'landing-lots-map',
  standalone: true,
  imports: [LeafletModule, UiModal, UiBadge, UiButton, DecimalPipe],
  templateUrl: './lots-map.html',
  styleUrl: './lots-map.scss',
})
export class LotsMap implements OnChanges, OnDestroy {
  @Input({ required: true }) lots: Lot[] = [];
  @Input() selected: Lot | null = null;
  @Output() selectLot = new EventEmitter<Lot>();

  openLot = signal<Lot | null>(null);

  // ✅ Dejalo true mientras dibujás, después ponelo en false
  editorMode = signal(false);

  activeLotId = signal<string>('L-01');
  exportJson = signal<string>('');

  private readonly imgUrl = '/assets/media/masterplan.png';

  // ✅ Tu imagen: 615×584 (ancho×alto)
  private readonly IMG_W = 615;
  private readonly IMG_H = 584;
  private readonly bounds = L.latLngBounds([0, 0], [this.IMG_H, this.IMG_W]);

  options: L.MapOptions = {
    crs: L.CRS.Simple,
    zoomControl: true,
    attributionControl: false,
    minZoom: -1,
    maxZoom: 4,
    zoom: 0,
    center: L.latLng(this.IMG_H / 2, this.IMG_W / 2),
  };

  private map?: L.Map;
  private overlay?: L.ImageOverlay;

  // FeatureGroup usado por Leaflet-Draw para editar/borrar
  private drawnGroup?: L.FeatureGroup;

  // Guardamos layers por lote (persistentes, NO recrear)
  private layerById = new Map<string, LotLayer>();

  // Draft polygons (lo dibujado/ajustado por el editor)
  private draftById = new Map<string, Array<[number, number]>>();

  // Lookup para que click siempre use el último lot
  private lotById = new Map<string, Lot>();

  private drawInited = false;

  onMapReady(map: L.Map) {
    this.map = map;

    if (!this.overlay) {
      this.overlay = L.imageOverlay(this.imgUrl, this.bounds, { opacity: 1 }).addTo(map);
      map.fitBounds(this.bounds);
      map.setMaxBounds(this.bounds.pad(0.06));
    }

    if (!this.drawnGroup) {
      this.drawnGroup = new L.FeatureGroup();
      map.addLayer(this.drawnGroup);
    }

    // ✅ init tools solo una vez por instancia
    if (this.editorMode() && !this.drawInited) {
      this.initDrawTools();
      this.drawInited = true;
    }

    this.renderLots();
    this.focusSelected();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['lots']) {
      // si el lote activo dejó de existir (por filtro), lo ajustamos
      const active = this.activeLotId();
      if (this.lots.length && !this.lots.some((l) => l.id === active)) {
        this.activeLotId.set(this.lots[0].id);
      }
      this.renderLots();
    }

    if (changes['selected']) {
      this.highlightSelected(this.selected?.id ?? null);
      this.focusSelected();
    }
  }

  ngOnDestroy() {
    this.map?.remove();
  }

  // -----------------------
  // Render visible layers
  // -----------------------
  private renderLots() {
    if (!this.map || !this.drawnGroup) return;

    this.lotById = new Map(this.lots.map((l) => [l.id, l]));

    // ids visibles según la lista que llega (filtrada)
    const visibleIds = new Set<string>();

    for (const lot of this.lots) {
      const polyData = this.draftById.get(lot.id) ?? lot.polygon ?? [];
      const hasPoly = polyData.length > 0;

      const existing = this.layerById.get(lot.id);

      if (!hasPoly) {
        // si no tiene polígono, ocultamos si estaba
        if (existing && this.drawnGroup.hasLayer(existing)) {
          this.drawnGroup.removeLayer(existing);
        }
        continue;
      }

      visibleIds.add(lot.id);

      let layer = existing;

      if (!layer) {
        layer = L.polygon(
          polyData.map(([y, x]) => L.latLng(y, x)),
          {
            // class base para css/glow
            className: 'lot-path',
          }
        ) as LotLayer;

        layer.__lotId = lot.id;

        layer.on('click', () => {
          const id = layer!.__lotId!;
          const currentLot = this.lotById.get(id);
          if (!currentLot) return;

          this.selectLot.emit(currentLot);
          this.openLot.set(currentLot);
          this.highlightSelected(id);
          this.focusLot(id);
        });

        layer.bindTooltip(`${lot.code} • ${this.statusLabel(lot.status)}`, { sticky: true });

        this.layerById.set(lot.id, layer);
      } else {
        // si el layer existe y el polygon cambió (por draft), actualizamos shape
        const current = this.layerToPolygon(layer);
        const target = polyData;
        if (!this.samePolygon(current, target)) {
          layer.setLatLngs([target.map(([y, x]) => L.latLng(y, x))] as any);
        }
      }

      // asegurar que esté en el group visible/editable
      if (!this.drawnGroup.hasLayer(layer)) {
        this.drawnGroup.addLayer(layer);
      }

      // estilos por estado + seleccionado
      this.applyLotStyle(layer, lot, lot.id === this.selected?.id);
    }

    // remover del group los layers que no están en la lista visible actual
    this.layerById.forEach((layer, id) => {
      if (!visibleIds.has(id) && this.drawnGroup!.hasLayer(layer)) {
        this.drawnGroup!.removeLayer(layer);
      }
    });

    this.highlightSelected(this.selected?.id ?? null);
  }

  private samePolygon(a: Array<[number, number]>, b: Array<[number, number]>) {
    if (a.length !== b.length) return false;
    for (let i = 0; i < a.length; i++) {
      if (a[i][0] !== b[i][0] || a[i][1] !== b[i][1]) return false;
    }
    return true;
  }

  private layerToPolygon(layer: L.Polygon): Array<[number, number]> {
    const latlngs = layer.getLatLngs()[0] as L.LatLng[];
    return latlngs.map((p) => [Math.round(p.lat), Math.round(p.lng)]);
  }

  private applyLotStyle(layer: L.Polygon, lot: Lot, selected: boolean) {
    const s = this.statusStyle(lot.status);

    layer.setStyle({
      color: selected ? 'rgba(212,175,55,0.98)' : s.stroke,
      weight: selected ? 4 : 3,
      dashArray: selected ? undefined : s.dashArray,
      fillColor: s.fill,
      fillOpacity: selected ? Math.min(0.75, s.fillOpacity + 0.20) : s.fillOpacity,
      opacity: 0.98,
    });

    // ✅ clases para glow por status (actualiza si cambia status)
    const el = (layer as any).getElement?.() as SVGElement | undefined;
    if (el) {
      el.classList.toggle('lot-available', lot.status === 'AVAILABLE');
      el.classList.toggle('lot-reserved', lot.status === 'RESERVED');
      el.classList.toggle('lot-sold', lot.status === 'SOLD');
      el.classList.toggle('lot-selected', selected);
    }
  }

  private statusStyle(status: Lot['status']) {
    switch (status) {
      case 'AVAILABLE':
        return {
          stroke: 'rgba(46, 204, 113, 0.95)',   // verde visible
          fill: 'rgba(46, 204, 113, 0.42)',
          fillOpacity: 0.40,
          dashArray: undefined,
        };
      case 'RESERVED':
        return {
          stroke: 'rgba(241, 196, 15, 0.98)',   // ámbar
          fill: 'rgba(241, 196, 15, 0.36)',
          fillOpacity: 0.34,
          dashArray: '10 6',                    // dashed
        };
      case 'SOLD':
        return {
          stroke: 'rgba(231, 76, 60, 0.95)',    // rojo
          fill: 'rgba(231, 76, 60, 0.22)',
          fillOpacity: 0.20,
          dashArray: '3 8',                     // dotted-ish
        };
      default:
        return {
          stroke: 'rgba(200, 180, 138, 0.70)',
          fill: 'rgba(200, 180, 138, 0.20)',
          fillOpacity: 0.18,
          dashArray: undefined,
        };
    }
  }

  private highlightSelected(id: string | null) {
    // re-estiliza todos los visibles con el nuevo seleccionado
    for (const lot of this.lots) {
      const layer = this.layerById.get(lot.id);
      if (!layer) continue;
      this.applyLotStyle(layer, lot, !!id && lot.id === id);
    }
  }

  private focusSelected() {
    if (!this.selected?.id) return;
    this.focusLot(this.selected.id);
  }

  private focusLot(id: string) {
    const layer = this.layerById.get(id);
    if (!layer || !this.map) return;
    this.map.fitBounds(layer.getBounds().pad(0.35), { animate: true });
  }

  // -----------------------
  // Leaflet Draw init (estable)
  // -----------------------
  private initDrawTools() {
    if (!this.map || !this.drawnGroup) return;

    const drawControl = new L.Control.Draw({
      edit: {
        featureGroup: this.drawnGroup,
        edit: {},
        remove: true,
      },
      draw: {
        polygon: {
          allowIntersection: false,
          showArea: false,
        },
        polyline: false,
        rectangle: false,
        circle: false,
        marker: false,
        circlemarker: false,
      },
    });

    this.map.addControl(drawControl);

    // CREATED
    this.map.on(L.Draw.Event.CREATED, (e: any) => {
      const layer = e.layer as LotLayer;
      const lotId = this.activeLotId();

      // reemplazar si ya existía
      const prev = this.layerById.get(lotId);
      if (prev && this.drawnGroup!.hasLayer(prev)) {
        this.drawnGroup!.removeLayer(prev);
      }
      this.layerById.delete(lotId);

      layer.__lotId = lotId;
      layer.options.className = 'lot-path';

      // guardamos coords
      const polygon = this.layerToPolygon(layer);
      this.draftById.set(lotId, polygon);

      // agregar a grupo y map
      this.drawnGroup!.addLayer(layer);
      this.layerById.set(lotId, layer);

      // click handler (lookup por id)
      layer.on('click', () => {
        const id = layer.__lotId!;
        const currentLot = this.lotById.get(id);
        if (!currentLot) return;

        this.selectLot.emit(currentLot);
        this.openLot.set(currentLot);
        this.highlightSelected(id);
        this.focusLot(id);
      });

      const lot = this.lotById.get(lotId);
      if (lot) {
        layer.bindTooltip(`${lot.code} • ${this.statusLabel(lot.status)}`, { sticky: true });
        this.applyLotStyle(layer, lot, true);
        this.selectLot.emit(lot);
        this.focusLot(lotId);
      }
    });

    // EDITED
    this.map.on(L.Draw.Event.EDITED, (e: any) => {
      e.layers.eachLayer((layer: LotLayer) => {
        const id = layer.__lotId;
        if (!id) return;
        this.draftById.set(id, this.layerToPolygon(layer));

        const lot = this.lotById.get(id);
        if (lot) this.applyLotStyle(layer, lot, id === this.selected?.id);
      });
    });

    // DELETED
    this.map.on(L.Draw.Event.DELETED, (e: any) => {
      e.layers.eachLayer((layer: LotLayer) => {
        const id = layer.__lotId;
        if (!id) return;
        this.draftById.delete(id);
        this.layerById.delete(id);
      });
    });
  }

  // -----------------------
  // UI actions
  // -----------------------
  setActiveLot(id: string) {
    this.activeLotId.set(id);
  }

  clearActivePolygon() {
    const id = this.activeLotId();
    this.draftById.delete(id);

    const layer = this.layerById.get(id);
    if (layer && this.drawnGroup?.hasLayer(layer)) {
      this.drawnGroup.removeLayer(layer);
    }
    this.layerById.delete(id);
  }

  exportAll() {
    const merged = this.lots.map((l) => ({
      ...l,
      polygon: this.draftById.get(l.id) ?? l.polygon ?? [],
    }));

    const text = JSON.stringify(merged, null, 2);
    this.exportJson.set(text);
    console.log('LOTS JSON:', text);

    void navigator.clipboard?.writeText(text).catch(() => { });
  }

  private statusLabel(s: Lot['status']) {
    switch (s) {
      case 'AVAILABLE': return 'Disponible';
      case 'RESERVED': return 'Reservado';
      case 'SOLD': return 'Vendido';
      default: return s;
    }
  }

  private phone = '5493446000000';
  whatsLot(lot: Lot) {
    return `https://wa.me/${this.phone}?text=${encodeURIComponent(
      `Hola! Quiero consultar por ${lot.code} (${lot.areaM2}m²).`
    )}`;
  }
}