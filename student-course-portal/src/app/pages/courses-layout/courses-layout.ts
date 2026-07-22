import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

/**
 * Task 72: CoursesLayoutComponent — acts as a shell for the nested /courses routes.
 * It contains its own <router-outlet> so child routes (CourseList and CourseDetail)
 * render inside this layout.
 *
 * Route config:
 * { path: 'courses', component: CoursesLayoutComponent, children: [
 *     { path: '',   component: CourseListComponent },
 *     { path: ':id', component: CourseDetailComponent }
 * ]}
 */
@Component({
  selector: 'app-courses-layout',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <div class="courses-layout">
      <div class="layout-header">
        <h1>📚 Courses</h1>
      </div>
      <!-- Task 72: Child routes render here -->
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [`
    .courses-layout {
      padding: 0 24px 24px;
    }
    .layout-header {
      border-bottom: 2px solid #e5e7eb;
      padding-bottom: 12px;
      margin-bottom: 8px;
    }
    .layout-header h1 {
      font-size: 1.5rem;
      color: #1e293b;
      margin: 0;
      padding: 16px 0;
    }
  `]
})
export class CoursesLayout {}
