import { Component, OnInit, inject } from '@angular/core';
import { AsyncPipe, NgIf } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { selectAllCourses } from '../../store/course/course.selectors';
import { Course } from '../../models/course.model';

@Component({
  selector: 'app-course-summary-widget',
  standalone: true,
  imports: [AsyncPipe, NgIf],
  template: `
    <div class="summary-widget">
      <h4>📊 Course Summary</h4>
      <ng-container *ngIf="courses$ | async as courses">
        <p>Total courses in service: <strong>{{ courses.length }}</strong></p>
        <p>Passed: <strong>{{ getCount(courses, 'passed') }}</strong></p>
        <p>Failed: <strong>{{ getCount(courses, 'failed') }}</strong></p>
        <p>Pending: <strong>{{ getCount(courses, 'pending') }}</strong></p>
      </ng-container>
    </div>
  `,
  styles: [`
    .summary-widget {
      background: #f0f9ff;
      border: 1px solid #bae6fd;
      border-radius: 8px;
      padding: 16px;
      margin-top: 24px;
    }
    h4 { margin: 0 0 12px; color: #0369a1; }
    p  { margin: 4px 0; color: #374151; }
  `]
})
export class CourseSummaryWidget implements OnInit {
  courses$: Observable<Course[]>;
  private store = inject(Store);

  constructor() {
    this.courses$ = this.store.select(selectAllCourses);
  }

  ngOnInit(): void {}

  getCount(courses: Course[], status: string): number {
    return courses.filter(c => c.gradeStatus === status).length;
  }
}
