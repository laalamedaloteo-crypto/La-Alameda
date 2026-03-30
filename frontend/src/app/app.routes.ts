import { Routes } from '@angular/router';
import { Home } from './features/landing/pages/home/home';

export const routes: Routes = [
    { path: '', component: Home },
    { path: 'novedades', loadComponent: () => import('./features/landing/sections/novedades/novedades').then(m => m.Novedades) },
    { path: '**', redirectTo: '' },
];