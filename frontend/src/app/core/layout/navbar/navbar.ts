import { Component, HostListener, signal } from '@angular/core';
import { UiButton } from '../../../shared/ui/button/button';

@Component({
  selector: 'app-navbar',
  imports: [UiButton],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {
  scrolled = signal(false);

  // Cambiá esto por tu WhatsApp o ruta de contacto
  private phone = '5493446370409';
  contactHref = `https://wa.me/${this.phone}?text=${encodeURIComponent('Hola! Quiero agendar una visita y recibir info de los lotes.')}`;

  @HostListener('window:scroll')
  onScroll() {
    this.scrolled.set(window.scrollY > 30);
  }
}