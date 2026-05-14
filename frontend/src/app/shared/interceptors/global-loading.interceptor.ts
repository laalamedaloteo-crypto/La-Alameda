import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { finalize, tap, catchError } from 'rxjs/operators';
import { GlobalLoadingService } from '../services/global-loading.service';

/**
 * HTTP Interceptor que maneja automáticamente el loading global
 * para requests importantes en la API.
 *
 * No muestra el loading para:
 * - Requests a recursos estáticos (images, CSS, JS)
 * - Requests que explícitamente porten el header X-Skip-Loading: true
 */
@Injectable()
export class GlobalLoadingInterceptor implements HttpInterceptor {
  constructor(private globalLoading: GlobalLoadingService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // No mostrar loading para solicitudes de recursos estáticos
    if (this.shouldSkipLoading(req)) {
      return next.handle(req);
    }

    // Mostrar loading
    this.globalLoading.show();

    return next.handle(req).pipe(
      tap((event: HttpEvent<any>) => {
        // Ocultar loading cuando completa exitosamente
        if (event instanceof HttpResponse) {
          this.globalLoading.hide();
        }
      }),
      catchError((error: HttpErrorResponse) => {
        // Ocultar loading y mostrar error amigable
        const errorMessage = this.getErrorMessage(error);
        this.globalLoading.showError(errorMessage);
        return throwError(() => error);
      }),
      finalize(() => {
        // Asegurar que se oculte el loading
        this.globalLoading.hide();
      })
    );
  }

  private shouldSkipLoading(req: HttpRequest<any>): boolean {
    // Saltar para recursos estáticos
    const url = req.url.toLowerCase();
    if (url.includes('/assets/') || 
        url.endsWith('.json') && !url.includes('/api/') ||
        url.endsWith('.jpg') ||
        url.endsWith('.png') ||
        url.endsWith('.gif') ||
        url.endsWith('.svg') ||
        url.endsWith('.css') ||
        url.endsWith('.js')) {
      return true;
    }

    // Saltar si el cliente lo solicita explícitamente
    if (req.headers.has('X-Skip-Loading')) {
      return true;
    }

    return false;
  }

  private getErrorMessage(error: HttpErrorResponse): string {
    // Mensajes amigables sin detalles técnicos
    if (!navigator.onLine) {
      return 'Parece que no tenés conexión a internet. Verificá tu conexión y intentá nuevamente.';
    }

    switch (error.status) {
      case 0:
        return 'Hubo un problema de conectividad. Por favor, intentá nuevamente.';
      case 400:
        return 'Solicitud inválida. Por favor, verificá los datos e intentá nuevamente.';
      case 401:
        return 'Tu sesión ha expirado. Por favor, inicia sesión nuevamente.';
      case 403:
        return 'No tenés permisos para acceder a este recurso.';
      case 404:
        return 'El recurso solicitado no fue encontrado.';
      case 500:
      case 502:
      case 503:
      case 504:
        return 'El servidor está experimentando dificultades. Por favor, intentá nuevamente en unos momentos.';
      default:
        return 'Hubo un inconveniente al obtener los datos. Por favor, intentá nuevamente en unos segundos.';
    }
  }
}
