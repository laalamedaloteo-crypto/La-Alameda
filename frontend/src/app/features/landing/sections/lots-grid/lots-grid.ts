import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { Lot } from '../../../../core/services/lots-api';
import { LotCard } from '../../../../shared/lots/lot-card/lot-card';
import { UiButton } from '../../../../shared/ui/button/button';

@Component({
  selector: 'landing-lots-grid',
  standalone: true,
  imports: [DecimalPipe, LotCard, UiButton],
  templateUrl: './lots-grid.html',
  styleUrl: './lots-grid.scss',
})
export class LotsGrid {
  @Input({ required: true }) lots: Lot[] = [];
  @Input() selected: Lot | null = null;

  @Output() selectLot = new EventEmitter<Lot | null>();

  onClick(lot: Lot) {
    this.selectLot.emit(lot);
  }

  onBackgroundClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('lot-card')) {
      this.selectLot.emit(null);
    }
  }
}