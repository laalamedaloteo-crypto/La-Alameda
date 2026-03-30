import { Component } from '@angular/core';

import { Hero } from '../../sections/hero/hero';
import { ValueProps } from '../../sections/value-props/value-props';
import { Amenities } from '../../sections/amenities/amenities';
import { LotsSection } from '../../sections/lots-section/lots-section';
import { Gallery } from '../../sections/gallery/gallery';
import { Location } from '../../sections/location/location';
import { Faq } from '../../sections/faq/faq';
import { Novedades } from '../../sections/novedades/novedades';
import { CtaContact } from '../../sections/cta-contact/cta-contact';

@Component({
  selector: 'app-home',
  imports: [Hero, ValueProps, Amenities, LotsSection, Gallery, Location, Novedades, Faq, CtaContact],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home { }