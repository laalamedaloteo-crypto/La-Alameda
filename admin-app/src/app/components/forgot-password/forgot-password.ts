import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './forgot-password.html',
  styleUrl: './forgot-password.scss',
})
export class ForgotPassword {
  private auth = inject(AuthService);
  private router = inject(Router);

  email = '';
  code = '';
  newPassword = '';
  confirmPassword = '';

  step = signal(1); // 1: Pedir mail, 2: Resetear con código
  loading = signal(false);
  error = signal<string | null>(null);
  success = signal(false);

  onRequestCode() {
    if (!this.email) return;

    this.loading.set(true);
    this.error.set(null);

    this.auth.forgotPassword(this.email).subscribe({
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

  onResetPassword() {
    if (this.newPassword !== this.confirmPassword) {
      this.error.set('Las contraseñas no coinciden');
      return;
    }

    if (this.newPassword.length < 6) {
      this.error.set('La nueva clave debe tener al menos 6 caracteres');
      return;
    }

    this.loading.set(true);
    this.error.set(null);

    this.auth.resetPassword({
      email: this.email,
      code: this.code,
      newPassword: this.newPassword
    }).subscribe({
      next: () => {
        this.loading.set(false);
        this.success.set(true);
        setTimeout(() => this.router.navigate(['/login']), 3000);
      },
      error: (err) => {
        this.loading.set(false);
        this.error.set(err.error?.message || 'Error al restablecer contraseña');
      }
    });
  }
}
