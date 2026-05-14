import { Injectable, signal } from '@angular/core';

export interface LoadingState {
  isVisible: boolean;
  isLoading: boolean;
  hasError: boolean;
  errorMessage?: string;
}

@Injectable({ providedIn: 'root' })
export class GlobalLoadingService {
  private activeRequests = signal<number>(0);
  private showLoadingTimer: ReturnType<typeof setTimeout> | null = null;
  private retryCallback: (() => void) | null = null;

  isVisible = signal<boolean>(false);
  hasError = signal<boolean>(false);
  errorMessage = signal<string>('');

  private readonly SHOW_LOADING_DELAY = 2500; // 2.5 segundos

  show(message: string = ''): void {
    this.activeRequests.update(val => val + 1);

    if (!this.showLoadingTimer) {
      this.showLoadingTimer = setTimeout(() => {
        if (this.activeRequests() > 0) {
          this.isVisible.set(true);
          this.hasError.set(false);
        }
        this.showLoadingTimer = null;
      }, this.SHOW_LOADING_DELAY);
    }
  }

  hide(): void {
    this.activeRequests.update(val => Math.max(0, val - 1));

    if (this.activeRequests() === 0) {
      this.clearTimer();
      this.isVisible.set(false);
      this.hasError.set(false);
      this.errorMessage.set('');
    }
  }

  showError(message: string, retryFn?: () => void): void {
    this.clearTimer();
    this.activeRequests.set(0);
    this.hasError.set(true);
    this.errorMessage.set(message);
    this.isVisible.set(true);
    this.retryCallback = retryFn || null;
  }

  retry(): void {
    if (this.retryCallback) {
      this.reset();
      this.retryCallback();
    }
  }

  reset(): void {
    this.clearTimer();
    this.activeRequests.set(0);
    this.isVisible.set(false);
    this.hasError.set(false);
    this.errorMessage.set('');
    this.retryCallback = null;
  }

  private clearTimer(): void {
    if (this.showLoadingTimer) {
      clearTimeout(this.showLoadingTimer);
      this.showLoadingTimer = null;
    }
  }

  getActiveRequests(): number {
    return this.activeRequests();
  }
}
