import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class Footer {
  brand = 'LA ALAMEDA';
  year = new Date().getFullYear();

  // Cambiá por tus datos reales
  phoneDisplay = '+54 3446 370409';
  email = 'benettipropiedades@gmail.com';
  address = 'Doello Jurado 1.105 — Gualeguaychú, Entre Ríos, Argentina';
}