import { Component, Input } from '@angular/core';
import { LotStatus } from '../../../core/services/lots-api';

@Component({
  selector: 'ui-badge',
  imports: [],
  templateUrl: './badge.html',
  styleUrl: './badge.scss',
})
export class UiBadge {
  @Input({ required: true }) status!: LotStatus;

  get label() {
    switch (this.status) {
      case 'AVAILABLE':
        return 'Disponible';
      case 'RESERVED':
        return 'Reservado';
      case 'SOLD':
        return 'Vendido';
    }
  }
}