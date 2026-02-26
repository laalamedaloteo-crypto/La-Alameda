import { Component } from '@angular/core';

type AmenityId = 'access' | 'security' | 'lights' | 'fiber' | 'parks';

@Component({
  selector: 'landing-amenities',
  imports: [],
  templateUrl: './amenities.html',
  styleUrl: './amenities.scss',
})
export class Amenities {
  // Cambiá la imagen cuando quieras (la elegís vos)
  bgUrl = '/assets/media/amenities.jpeg';

  items: Array<{ id: AmenityId; label: string }> = [
    { id: 'access', label: 'Ingreso controlado' },
    { id: 'security', label: 'Seguridad perimetral' },
    { id: 'lights', label: 'Calles iluminadas' },
    { id: 'fiber', label: 'Fibra óptica' },
    { id: 'parks', label: 'Parques y senderos' },
  ];
}