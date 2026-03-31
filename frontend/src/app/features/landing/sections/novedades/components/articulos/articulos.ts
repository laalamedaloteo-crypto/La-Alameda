import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'novedades-articulos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './articulos.html',
  styleUrl: './articulos.scss',
})
export class Articulos {
  @Input() articulos: any[] = [];
}
