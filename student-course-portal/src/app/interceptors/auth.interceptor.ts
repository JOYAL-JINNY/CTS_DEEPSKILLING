import { HttpInterceptorFn } from '@angular/common/http';

/**
 * Task 88: Auth Interceptor.
 * Intercepts all outgoing HTTP requests, clones them, and appends
 * an Authorization header before passing it along.
 */
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const clonedReq = req.clone({
    setHeaders: {
      Authorization: 'Bearer mocktoken-12345'
    }
  });
  return next(clonedReq);
};
