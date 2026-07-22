import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  FormControl,
  Validators,
  AbstractControl,
  ValidationErrors,
  ReactiveFormsModule
} from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { CourseService } from '../../services/course.service';
import { NotificationService } from '../../services/notification.service';
import { Router } from '@angular/router';

function noCourseCode(control: AbstractControl): ValidationErrors | null {
  const value = control.value as string;
  if (value && value.toString().toUpperCase().startsWith('XX')) {
    return { noCourseCode: true };
  }
  return null;
}

function simulateEmailCheck(control: AbstractControl): Promise<ValidationErrors | null> {
  return new Promise(resolve => {
    setTimeout(() => {
      const email = control.value as string;
      if (email && email.includes('test@')) {
        resolve({ emailTaken: true });
      } else {
        resolve(null);
      }
    }, 800);
  });
}

@Component({
  selector: 'app-reactive-enrollment-form',
  standalone: true,
  imports: [ReactiveFormsModule, NgFor, NgIf],
  templateUrl: './reactive-enrollment-form.html',
  styleUrl: './reactive-enrollment-form.css',
})
export class ReactiveEnrollmentForm implements OnInit {
  enrollForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private courseService: CourseService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.enrollForm = this.fb.group({
      studentName:       ['', [Validators.required, Validators.minLength(3)]],
      studentEmail:      ['', [Validators.required, Validators.email], [simulateEmailCheck]],
      courseId:          [null, [Validators.required, noCourseCode]],
      preferredSemester: ['Odd', Validators.required],
      agreeToTerms:      [false, Validators.requiredTrue],
      additionalCourses: this.fb.array([]),
    });
  }

  get additionalCourses(): FormArray {
    return this.enrollForm.get('additionalCourses') as FormArray;
  }

  addCourse(): void {
    this.additionalCourses.push(new FormControl('', Validators.required));
  }

  removeCourse(index: number): void {
    this.additionalCourses.removeAt(index);
  }

  /**
   * Task 81: Wire createCourse to submit handler.
   */
  onSubmit(): void {
    if (this.enrollForm.valid) {
      const formValue = this.enrollForm.getRawValue();
      
      // Map form to Course (Omit<Course, 'id'>)
      const newCourse = {
        name: `Course for ${formValue.studentName}`,
        code: formValue.courseId,
        credits: 3,
        gradeStatus: 'pending' as const
      };

      // Task 81: Call the HTTP POST method
      this.courseService.createCourse(newCourse).subscribe({
        next: (createdCourse) => {
          console.log('Course created successfully!', createdCourse);
          alert('Enrollment submitted and course created!');
          this.enrollForm.reset();
          this.router.navigate(['/courses']);
        },
        error: (err) => {
          console.error('Error creating course:', err);
          alert('Failed to submit enrollment.');
        }
      });
    }
  }
}
