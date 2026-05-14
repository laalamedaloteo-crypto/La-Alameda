import { Injectable, inject } from '@angular/core';
import { GlobalLoadingService } from './global-loading.service';
import { Observable, finalize } from 'rxjs';

/**
 * Hook/utilidad para manejar el loading en operaciones manuales
 * 
 * Ejemplo de uso:
 * 
 * constructor(private loadingUtil: GlobalLoadingUtil) {}
 * 
 * loadData() {
 *   this.loadingUtil.wrap$(
 *     this.apiService.getData()
 *   ).subscribe(data => {
 *     this.data = data;
 *   });
 * }
 */
@Injectable({ providedIn: 'root' })
export class GlobalLoadingUtil {
  private globalLoading = inject(GlobalLoadingService);

  /**
   * Envuelve un Observable para mostrar/ocultar automáticamente el loading
   * @param observable$ El observable a monitorear
   * @returns El mismo observable pero con lógica de loading
   */
  wrap$<T>(observable$: Observable<T>): Observable<T> {
    this.globalLoading.show();
    return observable$.pipe(
      finalize(() => this.globalLoading.hide())
    );
  }

  /**
   * Envuelve una Promesa para mostrar/ocultar automáticamente el loading
   * @param promise La promesa a monitorear
   * @returns La misma promesa pero con lógica de loading
   */
  wrap<T>(promise: Promise<T>): Promise<T> {
    this.globalLoading.show();
    return promise.finally(() => this.globalLoading.hide());
  }

  /**
   * Muestra el loading manualmente
   */
  show(): void {
    this.globalLoading.show();
  }

  /**
   * Oculta el loading manualmente
   */
  hide(): void {
    this.globalLoading.hide();
  }

  /**
   * Muestra un error con mensaje personalizado
   * @param message Mensaje de error amigable
   * @param retryFn Función a ejecutar al hacer click en "Reintentar"
   */
  showError(message: string, retryFn?: () => void): void {
    this.globalLoading.showError(message, retryFn);
  }

  /**
   * Resetea el estado del loading
   */
  reset(): void {
    this.globalLoading.reset();
  }
}
