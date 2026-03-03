import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';

import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private http = inject(HttpClient);
    private router = inject(Router);
    private readonly apiUrl = `${environment.apiUrl}/auth`;
    private readonly TOKEN_KEY = 'admin_token';

    login(credentials: { email: string; password: string }): Observable<any> {
        return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
            tap((res: any) => {
                if (res.token) {
                    localStorage.setItem(this.TOKEN_KEY, res.token);
                }
            })
        );
    }

    logout(): void {
        localStorage.removeItem(this.TOKEN_KEY);
        this.router.navigate(['/login']);
    }

    getToken(): string | null {
        return localStorage.getItem(this.TOKEN_KEY);
    }

    isLoggedIn(): boolean {
        return !!this.getToken();
    }

    private getHeaders() {
        return new HttpHeaders({
            'Authorization': `Bearer ${this.getToken()}`
        });
    }

    requestCode(): Observable<any> {
        return this.http.post(`${this.apiUrl}/request-code`, {}, { headers: this.getHeaders() });
    }

    changePassword(credentials: { currentPassword: string; newPassword: string; code: string }): Observable<any> {
        return this.http.post(`${this.apiUrl}/change-password`, credentials, { headers: this.getHeaders() });
    }

    forgotPassword(email: string): Observable<any> {
        return this.http.post(`${this.apiUrl}/forgot-password`, { email });
    }

    resetPassword(data: { email: string; code: string; newPassword: string }): Observable<any> {
        return this.http.post(`${this.apiUrl}/reset-password`, data);
    }
}
