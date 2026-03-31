import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'novedades-destacadas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './destacadas.html',
  styleUrl: './destacadas.scss',
})
export class Destacadas {
  @Input() destacadas: any[] = [];
}
