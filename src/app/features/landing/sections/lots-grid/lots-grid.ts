import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { Lot } from '../../../../core/services/lots-api';
import { UiBadge } from '../../../../shared/ui/badge/badge';
import { UiButton } from '../../../../shared/ui/button/button';

@Component({
  selector: 'landing-lots-grid',
  standalone: true,
  imports: [DecimalPipe, UiBadge, UiButton],
  templateUrl: './lots-grid.html',
  styleUrl: './lots-grid.scss',
})
export class LotsGrid {
  @Input({ required: true }) lots: Lot[] = [];
  @Input() selected: Lot | null = null;

  @Output() selectLot = new EventEmitter<Lot>();

  @ViewChild('track') track?: ElementRef<HTMLDivElement>;

  onClick(lot: Lot) {
    this.selectLot.emit(lot);
  }

  scroll(dir: 'prev' | 'next') {
    const el = this.track?.nativeElement;
    if (!el) return;
    const amount = Math.round(el.clientWidth * 0.85);
    el.scrollBy({ left: dir === 'next' ? amount : -amount, behavior: 'smooth' });
  }
}