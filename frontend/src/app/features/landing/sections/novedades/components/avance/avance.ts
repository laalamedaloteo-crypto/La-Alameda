import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'novedades-avance',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './avance.html',
  styleUrl: './avance.scss',
})
export class Avance {
  @Input() timeline: any[] = [];
}
