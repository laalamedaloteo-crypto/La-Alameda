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
  phoneDisplay = '+54 9 3446 000-000';
  email = 'info@laalameda.com.ar';
  address = 'Ruta XX, Km XX — Entre Ríos, Argentina';
}