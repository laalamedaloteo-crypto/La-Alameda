import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';

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
  private readonly apiUrl = 'http://localhost:3000/api/lots';
  private readonly assetsUrl = '/assets/data/lots.json';

  constructor(private http: HttpClient) { }

  listLots(): Observable<Lot[]> {
    return this.http.get<Lot[]>(this.apiUrl).pipe(
      catchError(() => this.http.get<Lot[]>(this.assetsUrl)),
      catchError(() => of(this.mockLots()))
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