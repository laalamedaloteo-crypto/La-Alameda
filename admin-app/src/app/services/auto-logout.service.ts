import { Injectable, inject, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { fromEvent, merge, Subject, timer } from 'rxjs';
import { switchMap, takeUntil, startWith } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class AutoLogoutService {
    private authService = inject(AuthService);
    private router = inject(Router);
    private ngZone = inject(NgZone);

    private readonly INACTIVITY_TIME = 10 * 60 * 1000; // 10 minutos
    private stopTimer$ = new Subject<void>();

    constructor() {
        this.startMonitoring();
    }

    /**
     * Inicia el monitoreo de actividad global.
     */
    startMonitoring() {
        this.stopToken(); // Limpiar previo si existe

        // Eventos que se consideran "actividad"
        const activity$ = merge(
            fromEvent(window, 'mousemove'),
            fromEvent(window, 'mousedown'),
            fromEvent(window, 'keypress'),
            fromEvent(window, 'touchstart'),
            fromEvent(window, 'scroll')
        );

        // Corremos fuera de Angular para performance
        this.ngZone.runOutsideAngular(() => {
            activity$.pipe(
                startWith(null),
                switchMap(() => timer(this.INACTIVITY_TIME)),
                takeUntil(this.stopTimer$)
            ).subscribe(() => {
                this.ngZone.run(() => {
                    // Solo cerramos sesión si el usuario está realmente logueado
                    if (this.authService.isLoggedIn()) {
                        this.logoutUser();
                    }
                });
            });
        });
    }

    private stopToken() {
        this.stopTimer$.next();
    }

    private logoutUser() {
        console.log('Inactividad detectada (10 min). Cerrando sesión...');
        this.authService.logout();
        this.router.navigate(['/login']);
    }
}
