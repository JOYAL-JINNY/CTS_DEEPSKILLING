import { createAction, props } from '@ngrx/store';
import { Course } from '../../models/course.model';

/**
 * Task 93: NgRx Actions for Course state.
 * The '[Course]' prefix is a convention that groups actions by feature.
 * It makes the Redux DevTools timeline highly readable.
 */
export const loadCourses = createAction('[Course] Load Courses');

export const loadCoursesSuccess = createAction(
  '[Course] Load Courses Success',
  props<{ courses: Course[] }>()
);

export const loadCoursesFailure = createAction(
  '[Course] Load Courses Failure',
  props<{ error: string }>()
);
