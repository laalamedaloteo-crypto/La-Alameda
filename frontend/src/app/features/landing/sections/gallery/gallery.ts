import { Component } from '@angular/core';

@Component({
  selector: 'landing-gallery',
  imports: [],
  templateUrl: './gallery.html',
  styleUrl: './gallery.scss',
})
export class Gallery {
  // Cambiá estas rutas por tus fotos (vos las elegís)
  images: string[] = [
    '/assets/media/gallery/1.jpeg',
    '/assets/media/gallery/2.jpeg',
    '/assets/media/gallery/3.jpeg',
    '/assets/media/gallery/4.jpeg',
    '/assets/media/gallery/5.jpeg',
  ];

  index = 0;

  prev() {
    this.index = (this.index - 1 + this.images.length) % this.images.length;
  }

  next() {
    this.index = (this.index + 1) % this.images.length;
  }

  goTo(i: number) {
    this.index = i;
  }

  trackByIndex(i: number) {
    return i;
  }
}