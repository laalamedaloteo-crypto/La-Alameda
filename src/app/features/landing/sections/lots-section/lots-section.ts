import { Component, computed, signal, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { timer, switchMap } from 'rxjs';
import { LotsApiService, Lot, LotStatus } from '../../../../core/services/lots-api';

import { LotsGrid } from '../lots-grid/lots-grid';
import { LotsMap } from '../lots-map/lots-map';

type Tab = 'list' | 'map';
type Filter = 'ALL' | LotStatus;

@Component({
    selector: 'landing-lots-section',
    standalone: true,
    imports: [LotsGrid, LotsMap],
    templateUrl: './lots-section.html',
    styleUrl: './lots-section.scss',
})
export class LotsSection {
    lots = signal<Lot[]>([]);
    selected = signal<Lot | null>(null);

    tab = signal<Tab>('list');
    filter = signal<Filter>('ALL');
    query = signal<string>('');

    page = signal(1);
    pageSize = 12;

    filteredLots = computed(() => {
        const f = this.filter();
        const q = this.query().trim().toLowerCase();
        let arr = this.lots();

        if (f !== 'ALL') arr = arr.filter((l) => l.status === f);
        if (q) arr = arr.filter((l) => l.code.toLowerCase().includes(q));

        return [...arr].sort((a, b) => a.id.localeCompare(b.id));
    });

    pagedLots = computed(() => {
        const end = this.page() * this.pageSize;
        return this.filteredLots().slice(0, end);
    });

    hasMore = computed(() => this.pagedLots().length < this.filteredLots().length);

    constructor(private api: LotsApiService) {
        const destroyRef = inject(DestroyRef);

        timer(0, 15000).pipe(
            switchMap(() => this.api.listLots()),
            takeUntilDestroyed(destroyRef)
        ).subscribe((l) => {
            console.log('Real-time update: Lots fetched');
            this.lots.set(l);
        });
    }

    setFilter(f: Filter) {
        this.filter.set(f);
        this.page.set(1);
        this.selected.set(null);
    }

    setTab(t: Tab) {
        this.tab.set(t);
    }

    loadMore() {
        this.page.set(this.page() + 1);
    }

    onSelect(lot: Lot) {
        this.selected.set(lot);
        this.tab.set('map');
    }
}