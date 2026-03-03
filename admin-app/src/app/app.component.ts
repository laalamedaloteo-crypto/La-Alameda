import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AutoLogoutService } from './services/auto-logout.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'admin-app';
  private autoLogout = inject(AutoLogoutService); // Se inicializa al cargar la app
}
