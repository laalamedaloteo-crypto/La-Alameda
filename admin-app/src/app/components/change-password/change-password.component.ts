import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-change-password',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './change-password.component.html',
    styleUrl: './change-password.component.scss'
})
export class ChangePasswordComponent {
    private auth = inject(AuthService);
    private router = inject(Router);

    currentPassword = '';
    newPassword = '';
    confirmPassword = '';
    code = '';

    step = signal(1); // 1: Pedir código, 2: Cambiar clave
    loading = signal(false);
    error = signal<string | null>(null);
    success = signal(false);

    nextStep() {
        this.loading.set(true);
        this.error.set(null);

        this.auth.requestCode().subscribe({
            next: () => {
                this.loading.set(false);
                this.step.set(2);
            },
            error: (err) => {
                this.loading.set(false);
                this.error.set(err.error?.message || 'Error al enviar el código');
            }
        });
    }

    onSubmit() {
        if (this.newPassword !== this.confirmPassword) {
            this.error.set('Las contraseñas nuevas no coinciden');
            return;
        }

        if (this.newPassword.length < 6) {
            this.error.set('La nueva contraseña debe tener al menos 6 caracteres');
            return;
        }

        if (!this.code) {
            this.error.set('Debes ingresar el código de verificación');
            return;
        }

        this.loading.set(true);
        this.error.set(null);

        this.auth.changePassword({
            currentPassword: this.currentPassword,
            newPassword: this.newPassword,
            code: this.code
        }).subscribe({
            next: () => {
                this.loading.set(false);
                this.success.set(true);
                setTimeout(() => this.router.navigate(['/dashboard']), 2000);
            },
            error: (err) => {
                this.loading.set(false);
                this.error.set(err.error?.message || 'Error al cambiar la contraseña');
            }
        });
    }

    cancel() {
        this.router.navigate(['/dashboard']);
    }
}
