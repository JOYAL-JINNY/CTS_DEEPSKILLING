import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CourseState } from './course.reducer';

/**
 * Task 95: Create feature selector for 'course' slice of state.
 */
export const selectCourseState = createFeatureSelector<CourseState>('course');

/**
 * Task 95: Selectors are memoised — they only recompute when their input
 * selectors change. This is NgRx's key performance optimisation.
 */
export const selectAllCourses = createSelector(
  selectCourseState,
  state => state.courses
);

export const selectCoursesLoading = createSelector(
  selectCourseState,
  state => state.loading
);

export const selectCoursesError = createSelector(
  selectCourseState,
  state => state.error
);
