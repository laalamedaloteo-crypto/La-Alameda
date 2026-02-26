import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Lot {
    id: string;
    code: string;
    areaM2: number;
    priceUsd: number;
    status: 'AVAILABLE' | 'RESERVED' | 'SOLD';
    description?: string;
    polygon?: any;
}

@Injectable({
    providedIn: 'root'
})
export class LotService {
    private http = inject(HttpClient);
    private readonly apiUrl = 'http://localhost:3000/api/lots';

    private getHeaders() {
        const token = localStorage.getItem('admin_token');
        return new HttpHeaders({
            'Authorization': `Bearer ${token}`
        });
    }

    getLots(): Observable<Lot[]> {
        return this.http.get<Lot[]>(this.apiUrl);
    }

    getLotById(id: string): Observable<Lot> {
        return this.http.get<Lot>(`${this.apiUrl}/${id}`);
    }

    updateLot(id: string, data: Partial<Lot>): Observable<Lot> {
        return this.http.put<Lot>(`${this.apiUrl}/${id}`, data, { headers: this.getHeaders() });
    }
}
