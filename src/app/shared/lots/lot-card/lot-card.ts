import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DecimalPipe } from '@angular/common';

import { Lot } from '../../../core/services/lots-api';
import { UiBadge } from '../../ui/badge/badge';
import { UiButton } from '../../ui/button/button';

@Component({
  selector: 'lot-card',
  imports: [UiBadge, UiButton, DecimalPipe],
  templateUrl: './lot-card.html',
  styleUrl: './lot-card.scss',
})
export class LotCard {
  @Input({ required: true }) lot!: Lot;
  @Input() active = false;
  @Output() select = new EventEmitter<Lot>();

  private phone = '5493446000000';

  get whatsHref() {
    return `https://wa.me/${this.phone}?text=${encodeURIComponent(
      `Hola! Quiero info de ${this.lot.code} (${this.lot.areaM2}m²).`
    )}`;
  }

  onClick() {
    this.select.emit(this.lot);
  }
}