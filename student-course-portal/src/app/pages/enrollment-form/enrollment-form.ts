import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { NgIf } from '@angular/common';

/**
 * Task 38: EnrollmentFormComponent — template-driven form at /enroll.
 * Task 40: onSubmit logs form.value and form.valid.
 * Task 46: submitted flag controls the success message.
 */
@Component({
  selector: 'app-enrollment-form',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './enrollment-form.html',
  styleUrl: './enrollment-form.css',
})
export class EnrollmentForm {
  // Task 46: Toggled true after successful submit to show success message
  submitted = false;

  // Properties for template-driven form ngModel binding
  studentName = '';
  studentEmail = '';
  courseId: number | null = null;
  preferredSemester = 'Odd';
  agreeToTerms = false;

  /**
   * Task 40: onSubmit receives the NgForm instance from the template.
   * form.value contains all field values keyed by their 'name' attributes.
   * form.valid is true only when all validators pass.
   */
  onSubmit(form: NgForm): void {
    console.log('Form value:', form.value);
    console.log('Form valid:', form.valid);
    if (form.valid) {
      this.submitted = true;
    }
  }

  /**
   * Task 47: Reset clears all field values and resets all validation states
   * (touched, dirty, pristine) — the NgForm directive handles this for us.
   */
  onReset(form: NgForm): void {
    form.resetForm();
    this.submitted = false;
  }
}
