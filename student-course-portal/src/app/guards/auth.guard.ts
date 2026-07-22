import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

/**
 * Task 75: AuthGuard (functional guard style, Angular 15+).
 * Checks AuthService.isLoggedIn. If true, allows navigation.
 * If false, redirects to '/' and blocks access.
 *
 * Applied to /profile and /enroll routes:
 * { path: 'profile', canActivate: [authGuard], component: StudentProfile }
 */
export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router      = inject(Router);

  if (authService.isLoggedIn) {
    return true;
  }
  // Not logged in → redirect to home and deny navigation
  router.navigate(['/']);
  return false;
};
