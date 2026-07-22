import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { LoadingService } from '../services/loading.service';
import { finalize } from 'rxjs/operators';

/**
 * Task 91: Loading Interceptor.
 * Intercepts all requests, turns the global loading spinner ON before sending,
 * and ensures it turns OFF using the finalize operator (which runs whether
 * the observable completes successfully or errors out).
 */
export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const loadingService = inject(LoadingService);
  
  // Turn spinner ON
  loadingService.setLoading(true);

  // Pass request to next handler, and turn spinner OFF on finalize
  return next(req).pipe(
    finalize(() => {
      loadingService.setLoading(false);
    })
  );
};
