import { Component } from '@angular/core';
import { UiButton } from '../../../../shared/ui/button/button';

@Component({
  selector: 'landing-hero',
  imports: [UiButton],
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
})
export class Hero {
  private phone = '5493446000000';
  whatsHref = `https://wa.me/${this.phone}?text=${encodeURIComponent(
    'Hola! Quiero consultar por la disponibilidad y precio de los lotes.'
  )}`;
}