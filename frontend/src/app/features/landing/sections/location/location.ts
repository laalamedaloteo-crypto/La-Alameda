import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'landing-location',
  imports: [],
  templateUrl: './location.html',
  styleUrl: './location.scss',
})
export class Location {
  mapSrc: SafeResourceUrl;

  items = [
    { icon: 'car', text: '35 min desde CABA por Autopista del Sol' },
    { icon: 'clock', text: '10 min del centro de Pilar' },
    { icon: 'pin', text: 'Cerca de colegios, shopping y clínicas' },
  ];

  constructor(private sanitizer: DomSanitizer) {
    const raw =
      'https://www.google.com/maps?q=-33.035575,-58.45494&z=14&output=embed';

    this.mapSrc = this.sanitizer.bypassSecurityTrustResourceUrl(raw);
  }
}