import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LotService, Lot } from '../../services/lot.service';
import { AuthService } from '../../services/auth.service';

type LotStatus = 'AVAILABLE' | 'RESERVED' | 'SOLD';
type StatusFilter = 'ALL' | LotStatus;

@Component({
    selector: 'app-dashboard',
    standalone: true,
    imports: [CommonModule, RouterModule, FormsModule],
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
    lotService = inject(LotService);
    authService = inject(AuthService);

    lots: Lot[] = [];
    searchTerm = '';
    statusFilter: StatusFilter = 'ALL';

    loading = true;
    error = '';

    filters: Array<{ key: StatusFilter; label: string }> = [
        { key: 'ALL', label: 'Todos' },
        { key: 'AVAILABLE', label: 'Disponibles' },
        { key: 'RESERVED', label: 'Reservados' },
        { key: 'SOLD', label: 'Vendidos' },
    ];

    get filteredLots() {
        const term = this.searchTerm.trim().toLowerCase();

        return this.lots
            .filter(l => {
                const matchesTerm =
                    !term ||
                    l.code.toLowerCase().includes(term) ||
                    (l.description && l.description.toLowerCase().includes(term));

                const matchesStatus =
                    this.statusFilter === 'ALL' || l.status === this.statusFilter;

                return matchesTerm && matchesStatus;
            })
            .sort((a, b) => a.code.localeCompare(b.code));
    }

    get statusCounts() {
        const c = { available: 0, reserved: 0, sold: 0 };
        for (const l of this.lots) {
            if (l.status === 'AVAILABLE') c.available++;
            if (l.status === 'RESERVED') c.reserved++;
            if (l.status === 'SOLD') c.sold++;
        }
        return c;
    }

    ngOnInit() {
        this.loadLots();
    }

    loadLots() {
        this.loading = true;
        this.error = '';
        this.lotService.getLots().subscribe({
            next: (data) => {
                this.lots = data;
                this.loading = false;
            },
            error: () => {
                this.error = 'Error al cargar los lotes.';
                this.loading = false;
            }
        });
    }

    reload() { this.loadLots(); }

    clearFilters() {
        this.searchTerm = '';
        this.statusFilter = 'ALL';
    }

    setStatusFilter(f: StatusFilter) { this.statusFilter = f; }

    logout() { this.authService.logout(); }

    trackById(_: number, lot: Lot) { return lot.id; }

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