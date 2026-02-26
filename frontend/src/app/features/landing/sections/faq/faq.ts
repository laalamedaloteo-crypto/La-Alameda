import { Component } from '@angular/core';

@Component({
  selector: 'landing-faq',
  imports: [],
  templateUrl: './faq.html',
  styleUrl: './faq.scss',
})
export class Faq {
  // Podés cambiar textos a tu caso real
  faqs = [
    {
      q: '¿Cuáles son las formas de pago?',
      a: 'Podés reservar con seña y completar el pago según disponibilidad. Consultanos por opciones y financiación.',
    },
    {
      q: '¿Cómo reservo un lote?',
      a: 'Te contactás por WhatsApp, elegís el lote disponible y coordinamos la reserva con documentación.',
    },
    {
      q: '¿Cuándo puedo empezar a construir?',
      a: 'Depende del lote y etapa del desarrollo. Coordinamos una visita y te informamos plazos y condiciones.',
    },
    {
      q: '¿El barrio tiene escritura?',
      a: 'Sí, se gestiona bajo condiciones del desarrollo. Consultanos por el detalle legal y tiempos.',
    },
    {
      q: '¿Qué servicios incluye?',
      a: 'Acceso jerarquizado, calles planificadas, iluminación, espacios verdes y conectividad según disponibilidad.',
    },
  ];

  openIndex: number | null = 0; // el primero abierto (o null)

  toggle(i: number) {
    this.openIndex = this.openIndex === i ? null : i;
  }
}