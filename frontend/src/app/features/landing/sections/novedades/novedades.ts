import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Articulos } from './components/articulos/articulos';

@Component({
  selector: 'landing-novedades',
  standalone: true,
  imports: [CommonModule, Articulos],
  templateUrl: './novedades.html',
  styleUrl: './novedades.scss',
  encapsulation: ViewEncapsulation.None
})
export class Novedades {
  destacadas = [
    {
      badge: 'AVANCE DE OBRA',
      date: '15 Mar 2026',
      title: 'La Alameda – Aprobacion del Convenio Urbanistico, mediante Ordenanza 13.066/2026',
      description: 'El Honorable Concejo Deliberante de Gualeguaychú formalizó el marco normativo de La Alameda. Este hito garantiza la seguridad jurídica del proyecto y consolida las condiciones técnicas y administrativas para su crecimiento ordenado.',
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
      badge: 'NUEVO LOTE',
      date: '08 Mar 2026',
      title: 'Invertir en tierra: una alternativa vigente para resguardar valor',
      description: 'En el contexto actual, los activos reales se posicionan como la opción más sólida para proteger el capital frente a la inflación. Conocé por qué la compra de lotes sigue siendo el refugio preferido por su potencial de valorización.',
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
      badge: 'EVENTO',
      date: '01 Mar 2026',
      title: 'El mercado inmobiliario argentino muestra señales de reactivación',
      description: 'Tras un incremento sostenido en consultas y operaciones, el sector inmobiliario confirma su recuperación. La estabilidad de variables económicas vuelve a impulsar el interés por desarrollos urbanos como inversión a largo plazo.',
      image: 'https://images.unsplash.com/photo-1600607686527-6fb886090705?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    }
  ];

  articulos = [
    {
      author: 'Informe Municipal',
      date: 'Abr 2026',
      title: 'La Alameda – Aprobación del Convenio Urbanístico (Ord. 13.066/2026)',
      description: 'El Honorable Concejo Deliberante de Gualeguaychú formalizó el marco normativo de La Alameda. Este hito garantiza la seguridad jurídica del proyecto y consolida las condiciones técnicas y administrativas para su crecimiento ordenado.',
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      fullContent: 'El Honorable Concejo Deliberante de Gualeguaychú aprobó el Convenio Urbanístico del desarrollo La Alameda mediante la Ordenanza Nº 13066/2026, otorgando el encuadre normativo correspondiente al proyecto.\n\nLa aprobación es el resultado de un proceso previo de análisis, revisión y validación técnica por parte de las áreas competentes, en el marco de la normativa vigente. De este modo, quedan formalizadas las condiciones urbanísticas, técnicas y administrativas que rigen el desarrollo.\n\nEste hito institucional consolida la planificación presentada y ratifica la adecuación del proyecto a los lineamientos establecidos para el crecimiento ordenado de la ciudad.\n\nLa Alameda continúa su evolución sobre bases sólidas, con seguridad jurídica y conforme a las disposiciones aprobadas por las autoridades locales.',
      source: 'Municipalidad de Gualeguaychú'
    },
    {
      author: 'Infobae',
      date: '15 de febrero de 2026',
      title: 'Invertir en tierra: una alternativa vigente para resguardar valor',
      description: 'Invertir en tierra: una alternativa vigente para resguardar valor frente a la economía actual.',
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      fullContent: 'En el contexto económico actual, la inversión en tierra y desarrollos inmobiliarios continúa posicionándose como una opción sólida para proteger el capital.\n\nEspecialistas destacan que los activos reales permiten resguardar valor frente a la inflación, además de ofrecer potencial de valorización a mediano y largo plazo. En particular, la compra de lotes en desarrollos urbanos gana relevancia por su accesibilidad y proyección.\n\nAsimismo, el sector inmobiliario muestra dinamismo, acompañado por nuevas oportunidades de inversión y condiciones que favorecen el ingreso de nuevos compradores.\n\nLa tierra, como activo tangible, sigue siendo una alternativa confiable para quienes buscan estabilidad y previsibilidad en sus decisiones financieras.',
      source: 'Infobae'
    },
    {
      author: 'Ámbito Financiero',
      date: '28 de marzo de 2026',
      title: 'El mercado inmobiliario argentino muestra señales de reactivación',
      description: 'Tras un incremento sostenido en consultas y operaciones, el sector inmobiliario confirma su recuperación. La estabilidad de variables económicas vuelve a impulsar el interés por desarrollos urbanos como inversión a largo plazo.',
      image: 'https://images.unsplash.com/photo-1600607686527-6fb886090705?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      fullContent: 'El mercado inmobiliario argentino continúa mostrando signos de recuperación, con un incremento en las consultas y operaciones en distintas regiones del país.\n\nDe acuerdo con especialistas del sector, la estabilidad relativa de variables económicas y la reactivación de proyectos impulsan nuevamente el interés por la inversión en bienes raíces.\n\nEn este contexto, los desarrollos urbanos y la compra de terrenos se consolidan como opciones atractivas para quienes buscan alternativas de inversión de largo plazo.\n\nEl escenario actual reafirma el rol del sector inmobiliario como un refugio de valor frente a la incertidumbre económica.',
      source: 'Ámbito Financiero'
    }
  ];
}
