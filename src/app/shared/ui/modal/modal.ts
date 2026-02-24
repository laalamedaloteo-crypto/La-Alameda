import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'ui-modal',
  standalone: true,
  templateUrl: './modal.html',
  styleUrl: './modal.scss',
})
export class UiModal {
  @Input() open = false;

  // ✅ nuevo
  @Input() showCloseIcon = true;

  @Output() close = new EventEmitter<void>();
}