import { Component, computed, signal } from '@angular/core';
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

        return arr;
    });

    pagedLots = computed(() => {
        const end = this.page() * this.pageSize;
        return this.filteredLots().slice(0, end);
    });

    hasMore = computed(() => this.pagedLots().length < this.filteredLots().length);

    constructor(private api: LotsApiService) {
        this.api.listLots().subscribe((l) => this.lots.set(l));
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