import { CanDeactivateFn } from '@angular/router';
import { ReactiveEnrollmentForm } from '../pages/reactive-enrollment-form/reactive-enrollment-form';

/**
 * Task 77: UnsavedChanges guard — CanDeactivate for ReactiveEnrollmentFormComponent.
 * Checks if the reactive form is dirty (user has typed but not submitted).
 * If dirty, shows a browser confirm dialog. Returning true allows navigation away;
 * returning false keeps the user on the current page.
 */
export const unsavedChangesGuard: CanDeactivateFn<ReactiveEnrollmentForm> = (component) => {
  if (component.enrollForm && component.enrollForm.dirty) {
    return window.confirm('You have unsaved changes. Leave?');
  }
  return true;
};
