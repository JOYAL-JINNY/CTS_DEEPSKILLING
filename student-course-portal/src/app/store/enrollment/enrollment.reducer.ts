import { createReducer, on } from '@ngrx/store';
import * as EnrollmentActions from './enrollment.actions';

/** Task 99: Enrollment state */
export interface EnrollmentState {
  enrolledCourseIds: number[];
}

const initialState: EnrollmentState = {
  enrolledCourseIds: [101, 102] // Pre-seed for demo matching old service
};

/**
 * Task 99: Enrollment reducer managing enrolledCourseIds array.
 */
export const enrollmentReducer = createReducer(
  initialState,
  on(EnrollmentActions.enrollInCourse, (state, { courseId }) => ({
    ...state,
    enrolledCourseIds: state.enrolledCourseIds.includes(courseId) 
      ? state.enrolledCourseIds 
      : [...state.enrolledCourseIds, courseId]
  })),
  on(EnrollmentActions.unenrollFromCourse, (state, { courseId }) => ({
    ...state,
    enrolledCourseIds: state.enrolledCourseIds.filter(id => id !== courseId)
  })),
  on(EnrollmentActions.setEnrolledCourses, (state, { courseIds }) => ({
    ...state,
    enrolledCourseIds: courseIds
  }))
);
