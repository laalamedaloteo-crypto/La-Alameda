import { Component, HostBinding, Input } from '@angular/core';
import { LotStatus } from '../../../core/services/lots-api';

@Component({
  selector: 'ui-badge',
  standalone: true,
  templateUrl: './badge.html',
  styleUrl: './badge.scss',
})
export class UiBadge {
  @Input({ required: true }) status!: LotStatus;

  @HostBinding('class')
  get hostClass() {
    const s = (this.status || '').toLowerCase();
    return `badge status-${s}`;
  }

  get label() {
    switch (this.status) {
      case 'AVAILABLE': return 'Disponible';
      case 'RESERVED': return 'Reservado';
      case 'SOLD': return 'Vendido';
      default: return this.status;
    }
  }
}