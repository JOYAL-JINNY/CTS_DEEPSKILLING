import { Routes } from '@angular/router';
import { unsavedChangesGuard } from '../../guards/unsaved-changes.guard';

/**
 * Task 73: Enrollment feature routes — lazy loaded from the main app routes.
 * These components are NOT included in the initial app bundle.
 * Angular downloads this chunk only when the user first navigates to /enroll.
 * Verify in Chrome DevTools → Network tab: look for a separate .js chunk file
 * on first visit to /enroll.
 */
export const enrollmentRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('../../pages/enrollment-form/enrollment-form').then(m => m.EnrollmentForm),
  },
  {
    path: 'reactive',
    // Task 77: UnsavedChanges guard prevents accidental navigation away from dirty form
    canDeactivate: [unsavedChangesGuard],
    loadComponent: () =>
      import('../../pages/reactive-enrollment-form/reactive-enrollment-form').then(
        m => m.ReactiveEnrollmentForm
      ),
  },
];
