import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { catchError, Observable, of, tap } from 'rxjs';

export type LotStatus = 'AVAILABLE' | 'RESERVED' | 'SOLD';

export interface Lot {
  id: string;
  code: string;
  areaM2: number;
  priceUsd?: number;
  status: LotStatus;
  description?: string;
  polygon?: Array<[number, number]>;
}

@Injectable({ providedIn: 'root' })
export class LotsApiService {
  private readonly apiUrl = `${environment.apiUrl}/lots`;
  private readonly assetsUrl = '/assets/data/lots.json';
  // Temporal: durante redibujo de masterplan usamos siempre el JSON local.
  private readonly forceAssetsLots = false;

  constructor(private http: HttpClient) { }

  listLots(): Observable<Lot[]> {
    const headers = { 'Cache-Control': 'no-cache', 'Pragma': 'no-cache' };

    if (this.forceAssetsLots) {
      return this.http.get<Lot[]>(this.assetsUrl, { headers });
    }

    return this.http.get<Lot[]>(this.apiUrl, { headers }).pipe(
      catchError((err) => {
        console.warn('⚠️ API fetch failed, falling back to static JSON:', err.status);
        return this.http.get<Lot[]>(this.assetsUrl);
      }),
      catchError(() => {
        console.warn('❌ Static JSON fetch failed, using mock data');
        return of(this.mockLots());
      })
    );
  }

  private mockLots(): Lot[] {
    return Array.from({ length: 23 }, (_, i) => {
      const n = String(i + 1).padStart(2, '0');
      return {
        id: `L-${n}`,
        code: `L-${n}`,
        areaM2: 0,
        priceUsd: 0,
        status: 'AVAILABLE' as const,
        polygon: [],
      };
    });
  }
}