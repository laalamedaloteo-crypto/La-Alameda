import { Component } from '@angular/core';
import { UiButton } from '../../../../shared/ui/button/button';

@Component({
  selector: 'landing-cta-contact',
  imports: [UiButton],
  templateUrl: './cta-contact.html',
  styleUrl: './cta-contact.scss',
})
export class CtaContact {
  // Cambiá por tus datos reales
  phoneDisplay = '+54 3446 370409';
  phoneWa = '5493446370409';
  email = 'benettipropiedades@gmail.com';

  whatsHref = `https://wa.me/${this.phoneWa}?text=${encodeURIComponent(
    'Hola! Quiero agendar una visita personalizada y recibir info de lotes disponibles.'
  )}`;

  mailHref = `mailto:${this.email}?subject=${encodeURIComponent('Consulta - La Alameda')}`;
  telHref = `tel:${this.phoneDisplay.replace(/\s|-/g, '')}`;
}