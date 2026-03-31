import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Destacadas } from './components/destacadas/destacadas';
import { Avance } from './components/avance/avance';
import { Galeria } from './components/galeria/galeria';
import { Articulos } from './components/articulos/articulos';

@Component({
  selector: 'landing-novedades',
  standalone: true,
  imports: [CommonModule, Destacadas, Avance, Galeria, Articulos],
  templateUrl: './novedades.html',
  styleUrl: './novedades.scss',
  encapsulation: ViewEncapsulation.None
})
export class Novedades {
  destacadas = [
    {
      badge: 'AVANCE DE OBRA',
      date: '15 Mar 2026',
      title: 'Finalización del acceso principal y caseta de vigilancia',
      description: 'El acceso principal del desarrollo ya cuenta con la caseta de vigilancia terminada, paisajismo y control de acceso automatizado.',
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
      badge: 'NUEVO LOTE',
      date: '08 Mar 2026',
      title: 'Lotes premium con vista al lago disponibles',
      description: 'Se liberaron 12 nuevos lotes con vista directa al lago artificial, superficies desde 800 m² hasta 1.200 m².',
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
      badge: 'EVENTO',
      date: '01 Mar 2026',
      title: 'Open House exclusivo — Sábado 22 de Marzo',
      description: 'Te invitamos a recorrer el desarrollo con cata de vinos y asesoramiento personalizado. Cupos limitados.',
      image: 'https://images.unsplash.com/photo-1600607686527-6fb886090705?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    }
  ];

  timeline = [
    { date: 'ENE 2025', title: 'Inicio de obra', description: 'Movimiento de suelos y trazado de calles internas.', align: 'left' },
    { date: 'JUN 2025', title: 'Red vial completa', description: 'Pavimentación de calles, cordón cuneta y señalización.', align: 'right' },
    { date: 'NOV 2025', title: 'Servicios e infraestructura', description: 'Tendido eléctrico subterráneo, agua potable y fibra óptica.', align: 'left' },
    { date: 'MAR 2026', title: 'Áreas comunes', description: 'Club house, piscina, canchas deportivas y parque central.', align: 'right' },
    { date: 'DIC 2026', title: 'Entrega final', description: 'Entrega de lotes con escritura y habilitación municipal.', align: 'left' }
  ];

  galeria = [
    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1600607686527-6fb886090705?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  ];

  articulos = [
    {
      author: 'Equipo Inversiones',
      date: '10 Mar 2026',
      title: '¿Por qué invertir en lotes es la mejor decisión en 2026?',
      description: 'Analizamos las tendencias del mercado inmobiliario y por qué los terrenos premium siguen siendo el activo más seguro.',
      image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
    },
    {
      author: 'Arq. María López',
      date: '25 Feb 2026',
      title: 'Guía completa: Qué mirar antes de comprar un lote',
      description: 'Orientación, servicios, normativas y plusvalía: los 10 factores clave que todo comprador debe evaluar.',
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
    },
    {
      author: 'Lifestyle Blog',
      date: '05 Feb 2026',
      title: 'Beneficios de vivir en una comunidad planificada',
      description: 'Descubrí cómo la infraestructura pensada y las áreas comunes exclusivas mejoran drásticamente tu calidad de vida diaria.',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
    }
  ];
}
