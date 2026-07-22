import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { CourseService } from './course.service';
import { Course } from '../models/course.model';

/**
 * Task 63: EnrollmentService — tracks enrolled course IDs locally.
 */
@Injectable({ providedIn: 'root' })
export class EnrollmentService {
  private enrolledCourseIds: number[] = [101, 102];

  constructor(
    private courseService: CourseService,
    private http: HttpClient
  ) {}

  enroll(courseId: number): void {
    if (!this.isEnrolled(courseId)) {
      this.enrolledCourseIds.push(courseId);
    }
  }

  unenroll(courseId: number): void {
    this.enrolledCourseIds = this.enrolledCourseIds.filter(id => id !== courseId);
  }

  isEnrolled(courseId: number): boolean {
    return this.enrolledCourseIds.includes(courseId);
  }

  // Helper method for the profile page (temporary before NgRx)
  getEnrolledIds(): number[] {
    return this.enrolledCourseIds;
  }

  /**
   * Task 87: getStudentsByCourse — simulates an HTTP call to load students.
   * Returns an Observable that resolves after a delay. Used to demonstrate switchMap.
   */
  getStudentsByCourse(courseId: number): Observable<any[]> {
    const mockStudents = [
      { id: 1, name: 'Alice Smith' },
      { id: 2, name: 'Bob Jones' }
    ];
    // Simulate network delay
    return of(mockStudents).pipe(delay(1000));
  }
}
