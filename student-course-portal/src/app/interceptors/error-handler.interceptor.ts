import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { NotificationService } from '../services/notification.service';

/**
 * Task 90: Error Handler Interceptor.
 * Catches HTTP errors globally.
 * - 401 Unauthorized: Redirects to home/login.
 * - 500 Server Error: Shows global error notification.
 */
export const errorHandlerInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  // Note: Since NotificationService is currently component-scoped in NotificationComponent,
  // we would typically provide a global one for interceptors. We'll simulate logging it here.
  
  return next(req).pipe(
    catchError((error) => {
      if (error.status === 401) {
        console.warn('Unauthorized! Redirecting to login...');
        router.navigate(['/']);
      } else if (error.status === 500) {
        console.error('Server error! Please try again later.');
        alert('Server error occurred.');
      }
      // Re-throw the error so local catchError blocks can also handle it
      return throwError(() => error);
    })
  );
};
