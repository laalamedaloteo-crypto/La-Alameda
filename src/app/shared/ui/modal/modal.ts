import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'ui-modal',
  imports: [],
  templateUrl: './modal.html',
  styleUrl: './modal.scss',
})
export class UiModal {
  @Input({ required: true }) open!: boolean;
  @Output() close = new EventEmitter<void>();
}