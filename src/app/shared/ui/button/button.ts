import { Component, Input } from '@angular/core';

type Variant = 'gold' | 'outline' | 'ghost';
type Size = 'sm' | 'md';

@Component({
  selector: 'ui-button',
  imports: [],
  templateUrl: './button.html',
  styleUrl: './button.scss',
})
export class UiButton {
  @Input({ required: true }) label!: string;
  @Input() href?: string;

  @Input() variant: Variant = 'outline';
  @Input() size: Size = 'md';

  // si es link:
  @Input() target: '_blank' | '_self' = '_blank';
  @Input() rel = 'noopener';
}