import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [CommonModule, FormsModule, RouterLink],
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss'
})
export class LoginComponent {
    authService = inject(AuthService);
    router = inject(Router);

    email = '';
    password = '';
    error = '';
    loading = false;

    onSubmit() {
        this.loading = true;
        this.error = '';
        this.authService.login({ email: this.email, password: this.password }).subscribe({
            next: () => this.router.navigate(['/dashboard']),
            error: (err) => {
                this.error = err.error?.message || 'Error al iniciar sesión. Intentá de nuevo.';
                this.loading = false;
            }
        });
    }
}