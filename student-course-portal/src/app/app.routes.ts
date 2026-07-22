import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { CoursesLayout } from './pages/courses-layout/courses-layout';
import { CourseList } from './pages/course-list/course-list';
import { CourseDetail } from './pages/course-detail/course-detail';
import { StudentProfile } from './pages/student-profile/student-profile';
import { NotFound } from './pages/not-found/not-found';
import { authGuard } from './guards/auth.guard';

/**
 * Task 68: Full route table for the student portal.
 *
 * Route order matters — Angular matches in declaration order.
 * The ** wildcard MUST be last; placing it earlier would catch all routes.
 *
 * Task 72: /courses is a nested route with CoursesLayout as the shell.
 *          CoursesLayout has its own <router-outlet> for child routes.
 *
 * Task 73: /enroll uses loadChildren for lazy loading — the enrollment chunk
 *          is only downloaded when the user first visits /enroll.
 *
 * Task 75: /profile and /enroll are protected by authGuard.
 */
export const routes: Routes = [
  // Task 68: Home route
  { path: '', component: Home },

  // Task 72: Nested courses routes — CoursesLayout is the shell
  {
    path: 'courses',
    component: CoursesLayout,
    children: [
      // Task 68: /courses → CourseListComponent
      { path: '', component: CourseList },
      // Task 68/69: /courses/:id → CourseDetailComponent
      { path: ':id', component: CourseDetail },
    ],
  },

  // Task 68/76: /profile — guarded by authGuard
  {
    path: 'profile',
    canActivate: [authGuard],
    component: StudentProfile,
  },

  /**
   * Task 73/76: /enroll — lazy-loaded enrollment feature.
   * loadChildren downloads a separate JS chunk only on first visit.
   * Also protected by authGuard.
   *
   * Verify lazy loading: DevTools → Network → navigate to /enroll →
   * look for a new chunk-*.js file that wasn't downloaded on initial load.
   */
  {
    path: 'enroll',
    canActivate: [authGuard],
    loadChildren: () =>
      import('./features/enrollment/enrollment.routes').then(m => m.enrollmentRoutes),
  },

  /**
   * Task 68: ** wildcard — MUST be last in the array.
   * Angular evaluates routes top-to-bottom; ** before other routes
   * would catch every URL including valid ones.
   */
  { path: '**', component: NotFound },
];
