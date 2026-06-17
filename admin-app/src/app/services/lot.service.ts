import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export type LotStatus = 'AVAILABLE' | 'RESERVED' | 'SOLD';

export interface Lot {
    id: string;
    code: string;
    areaM2: number;
    priceUsd: number;
    status: LotStatus;
    description?: string;
    polygon?: any;
}

interface ApiLot extends Omit<Lot, 'status'> {
    status?: LotStatus | null;
}

function isClientLot(lot: ApiLot): lot is Lot {
    return lot.status === 'AVAILABLE' || lot.status === 'RESERVED' || lot.status === 'SOLD';
}

@Injectable({
    providedIn: 'root'
})
export class LotService {
    private http = inject(HttpClient);
    private readonly apiUrl = `${environment.apiUrl}/lots`;

    private getHeaders() {
        const token = localStorage.getItem('admin_token');
        return new HttpHeaders({
            'Authorization': `Bearer ${token}`
        });
    }

    getLots(): Observable<Lot[]> {
        return this.http.get<ApiLot[]>(this.apiUrl).pipe(
            map((lots) => lots.filter(isClientLot))
        );
    }

    getLotById(id: string): Observable<Lot> {
        return this.http.get<ApiLot>(`${this.apiUrl}/${id}`).pipe(
            map((lot) => {
                if (!isClientLot(lot)) {
                    throw new Error('El registro no es un lote administrable.');
                }
                return lot;
            })
        );
    }

    updateLot(id: string, data: Partial<Lot>): Observable<Lot> {
        return this.http.put<Lot>(`${this.apiUrl}/${id}`, data, { headers: this.getHeaders() });
    }
}
