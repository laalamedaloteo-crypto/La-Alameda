import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { Navbar } from './core/layout/navbar/navbar';
import { Footer } from './core/layout/footer/footer';
import { GlobalLoadingModalComponent } from './shared/ui/global-loading-modal/global-loading-modal.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, Footer, GlobalLoadingModalComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('frontend');
}