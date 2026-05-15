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
    loading = signal<boolean>(true);

    tab = signal<Tab>('list');
    filter = signal<Filter>('ALL');
    query = signal<string>('');
    isFilterDropdownOpen = signal<boolean>(false);


    filteredLots = computed(() => {
        const f = this.filter();
        const q = this.query().trim().toLowerCase();
        let arr = this.lots();

        if (f !== 'ALL') arr = arr.filter((l) => l.status === f);
        if (q) arr = arr.filter((l) => l.code.toLowerCase().includes(q));

        return [...arr].sort((a, b) => a.code.localeCompare(b.code, undefined, { numeric: true }));
    });

    constructor(private api: LotsApiService) {
        const destroyRef = inject(DestroyRef);

        timer(0, 5000).pipe(
            switchMap(() => this.api.listLots()),
            takeUntilDestroyed(destroyRef)
        ).subscribe({
            next: (l) => {
                this.lots.set(l);
                this.loading.set(false);
            },
            error: (err) => {
                console.error('🔴 Error in lots polling subscription:', err);
                this.loading.set(false);
            }
        });
    }

    setFilter(f: Filter) {
        this.filter.set(f);
        this.selected.set(null);
    }

    setTab(t: Tab) {
        this.tab.set(t);
    }



    onSelect(lot: Lot | null) {
        this.selected.set(lot);
        if (lot) {
            this.tab.set('map');
        }
    }
}