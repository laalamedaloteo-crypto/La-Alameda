import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GlobalLoadingService } from '../../services/global-loading.service';

@Component({
  selector: 'app-global-loading-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './global-loading-modal.component.html',
  styleUrl: './global-loading-modal.component.scss'
})
export class GlobalLoadingModalComponent {
  globalLoading = inject(GlobalLoadingService);

  onRetry(): void {
    this.globalLoading.retry();
  }
}
