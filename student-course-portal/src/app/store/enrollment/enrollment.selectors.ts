import { createFeatureSelector, createSelector } from '@ngrx/store';
import { EnrollmentState } from './enrollment.reducer';
import { selectAllCourses } from '../course/course.selectors';
import { Course } from '../../models/course.model';

/** Task 99: Feature selector for enrollment state */
export const selectEnrollmentState = createFeatureSelector<EnrollmentState>('enrollment');

export const selectEnrolledIds = createSelector(
  selectEnrollmentState,
  state => state.enrolledCourseIds
);

/**
 * Task 99: Cross-slice selector.
 * Combines courses from the Course slice and enrolledIds from the Enrollment slice
 * to produce the full array of enrolled Course objects.
 */
export const selectEnrolledCourses = createSelector(
  selectAllCourses,
  selectEnrolledIds,
  (courses: Course[], enrolledIds: number[]) => {
    return enrolledIds
      .map(id => courses.find(c => c.id === id))
      .filter((c): c is Course => c !== undefined);
  }
);
