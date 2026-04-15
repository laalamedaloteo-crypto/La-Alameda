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
    '/assets/media/gallery/1.png',
    '/assets/media/gallery/2.png',
    '/assets/media/gallery/3.png',
    '/assets/media/gallery/4.png',
    '/assets/media/gallery/5.jpg',
    '/assets/media/gallery/6.jpg',
    '/assets/media/gallery/7.jpg',
    '/assets/media/gallery/8.jpg',
    '/assets/media/gallery/9.jpg',
    '/assets/media/gallery/10.jpg',
    '/assets/media/gallery/11.jpeg',
  ];

  index = 0;

  // Touch & Swipe
  touchStartX = 0;
  
  // Trackpad / Wheel
  lastWheelTime = 0;

  // Lightbox
  isLightboxOpen = false;
  lightboxIndex = 0;

  prev() {
    this.index = (this.index - 1 + this.images.length) % this.images.length;
  }

  next() {
    this.index = (this.index + 1) % this.images.length;
  }

  goTo(i: number) {
    this.index = i;
  }

  getPrevIndex(current: number): number {
    return (current - 1 + this.images.length) % this.images.length;
  }

  getNextIndex(current: number): number {
    return (current + 1) % this.images.length;
  }

  trackByIndex(i: number) {
    return i;
  }

  onItemClick(i: number) {
    if (i === this.index) {
      this.openLightbox(i);
    } else {
      this.goTo(i);
    }
  }

  onTouchStart(event: TouchEvent) {
    this.touchStartX = event.changedTouches[0].screenX;
  }

  onTouchEnd(event: TouchEvent) {
    const touchEndX = event.changedTouches[0].screenX;
    const diff = this.touchStartX - touchEndX;

    if (diff > 50) this.next();
    else if (diff < -50) this.prev();
  }

  onWheel(event: WheelEvent) {
    // Only handle horizontal or vertical scroll if diff > threshold
    if (Math.abs(event.deltaX) < 15 && Math.abs(event.deltaY) < 15) return;

    // Optional: prevent vertical scrolling on the page while scrolling gallery
    // event.preventDefault(); 

    const now = Date.now();
    // Debounce to prevent multiple fires from trackpad inertia
    if (now - this.lastWheelTime < 500) return;

    if (event.deltaX > 0 || event.deltaY > 0) {
      this.next();
      this.lastWheelTime = now;
    } else if (event.deltaX < 0 || event.deltaY < 0) {
      this.prev();
      this.lastWheelTime = now;
    }
  }

  openLightbox(i: number) {
    this.lightboxIndex = i;
    this.isLightboxOpen = true;
    document.body.style.overflow = 'hidden';
  }

  closeLightbox() {
    this.isLightboxOpen = false;
    document.body.style.overflow = '';
  }

  nextLightbox(event: Event) {
    event.stopPropagation();
    this.lightboxIndex = (this.lightboxIndex + 1) % this.images.length;
  }

  prevLightbox(event: Event) {
    event.stopPropagation();
    this.lightboxIndex = (this.lightboxIndex - 1 + this.images.length) % this.images.length;
  }
}