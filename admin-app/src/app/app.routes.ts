import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LotDetailComponent } from './components/lot-detail/lot-detail.component';
import { inject } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

const authGuard = () => {
    console.log('Running authGuard');
    const authService = inject(AuthService);
    const router = inject(Router);
    const isLoggedIn = authService.isLoggedIn();
    console.log('isLoggedIn:', isLoggedIn);
    if (isLoggedIn) {
        return true;
    }
    console.log('Redirecting to /login');
    return router.parseUrl('/login');
};

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [authGuard]
    },
    {
        path: 'lot/:id',
        component: LotDetailComponent,
        canActivate: [authGuard]
    },
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    { path: '**', redirectTo: '/dashboard' }
];
