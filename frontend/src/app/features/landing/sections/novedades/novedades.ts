import { Component } from '@angular/core';

@Component({
  selector: 'landing-novedades',
  imports: [],
  templateUrl: './novedades.html',
  styleUrl: './novedades.scss',
})
export class Novedades {
  newsItems = [
    {
      title: 'Avance de Obra',
      date: 'Novedad Reciente',
      description: 'Estamos avanzando en la pavimentación de las calles principales para asegurar el mejor acceso y comodidad para todos los futuros residentes.',
    },
    {
      title: 'Nuevos lotes disponibles',
      date: 'Preventa',
      description: 'Se abrió la segunda etapa de comercialización. Aprovechá las excelentes opciones de financiación y asegurá tu lugar en La Alameda.',
    }
  ];
}
