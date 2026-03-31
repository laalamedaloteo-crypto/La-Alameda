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
      a: 'Contamos con opciones de pago al contado, con entrega inicial y financiación, o planes 100% financiados. Consultanos para más información.',
    },
    {
      q: '¿Cómo reservo un lote?',
      a: ' La reserva se realiza mediante una seña y la firma de la documentación correspondiente. Nuestro equipo te acompaña en todo el proceso para que sea simple y claro.',
    },
    {
      q: '¿El barrio tiene escritura?',
      a: 'Sí, se gestiona bajo condiciones del desarrollo. Consultanos por el detalle legal y tiempos.',
    },
    {
      q: '¿Qué servicios incluye?',
      a: 'La Alameda cuenta con una infraestructura completa, diseñada para brindar calidad y funcionamiento desde el inicio. Incluye parquización perimetral, calles con pavimento articulado, red de agua potable, tendido eléctrico subterráneo, luz solar sobre su boulevard y disponibilidad de conexión a internet por fibra óptica. Además, el proyecto incorpora portal de acceso que jerarquiza el ingreso, sistema de videovigilancia sobre el boulevard y una planificación general orientada al orden y la integración con el entorno. Es importante destacar que se trata de una urbanización abierta, por lo que no tiene expensas.',
    },
  ];

  openIndex: number | null = 0; // el primero abierto (o null)

  toggle(i: number) {
    this.openIndex = this.openIndex === i ? null : i;
  }
}