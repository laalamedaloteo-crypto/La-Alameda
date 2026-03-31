import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'novedades-galeria',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './galeria.html',
  styleUrl: './galeria.scss',
})
export class Galeria {
  @Input() galeria: string[] = [];
}
