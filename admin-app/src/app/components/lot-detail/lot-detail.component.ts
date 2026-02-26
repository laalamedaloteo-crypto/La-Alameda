import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { LotService, Lot } from '../../services/lot.service';

@Component({
    selector: 'app-lot-detail',
    standalone: true,
    imports: [CommonModule, FormsModule, RouterModule],
    templateUrl: './lot-detail.component.html',
    styleUrl: './lot-detail.component.scss'
})
export class LotDetailComponent implements OnInit {
    route = inject(ActivatedRoute);
    router = inject(Router);
    lotService = inject(LotService);

    lot: Lot | null = null;
    loading = true;
    saving = false;
    success = false;
    error = '';

    ngOnInit() {
        const id = this.route.snapshot.paramMap.get('id');
        if (id) this.loadLot(id);
    }

    retry() {
        const id = this.route.snapshot.paramMap.get('id');
        if (id) this.loadLot(id);
    }

    loadLot(id: string) {
        this.loading = true;
        this.error = '';
        this.lotService.getLotById(id).subscribe({
            next: (data) => { this.lot = data; this.loading = false; },
            error: () => { this.error = 'Error al cargar el lote.'; this.loading = false; },
        });
    }

    onSubmit() {
        if (!this.lot) return;

        this.saving = true;
        this.success = false;
        this.error = '';

        this.lotService.updateLot(this.lot.id, {
            priceUsd: this.lot.priceUsd,
            status: this.lot.status,
            areaM2: this.lot.areaM2,
            description: this.lot.description,
        }).subscribe({
            next: () => {
                this.saving = false;
                this.success = true;
                setTimeout(() => (this.success = false), 2500);
            },
            error: () => {
                this.error = 'Error al guardar.';
                this.saving = false;
            },
        });
    }

    getStatusLabel(s: string) {
        return ({ AVAILABLE: 'Disponible', RESERVED: 'Reservado', SOLD: 'Vendido' } as any)[s] || s;
    }

    getStatusClass(s: string) {
        return {
            'badge-available': s === 'AVAILABLE',
            'badge-reserved': s === 'RESERVED',
            'badge-sold': s === 'SOLD',
        };
    }
}