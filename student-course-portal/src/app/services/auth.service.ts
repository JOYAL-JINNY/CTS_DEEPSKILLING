import { Injectable } from '@angular/core';

/**
 * Task 75: AuthService — stores login state.
 * isLoggedIn is hardcoded true for demo purposes.
 * In a real app this would check a JWT token or session.
 */
@Injectable({ providedIn: 'root' })
export class AuthService {
  isLoggedIn = true;
}
