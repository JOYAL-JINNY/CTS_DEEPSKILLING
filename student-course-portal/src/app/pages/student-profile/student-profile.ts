import { Component, OnInit, inject } from '@angular/core';
import { NgFor, NgIf, AsyncPipe } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { NotificationComponent } from '../../components/notification/notification';
import { CourseSummaryWidget } from '../../components/course-summary-widget/course-summary-widget';
import { Course } from '../../models/course.model';
import { selectEnrolledCourses } from '../../store/enrollment/enrollment.selectors';
import { loadCourses } from '../../store/course/course.actions';

@Component({
  selector: 'app-student-profile',
  standalone: true,
  imports: [NgFor, NgIf, AsyncPipe, NotificationComponent, CourseSummaryWidget],
  templateUrl: './student-profile.html',
  styleUrl: './student-profile.css',
})
export class StudentProfile implements OnInit {
  // Task 100: Enrolled courses fetched from cross-slice NgRx selector
  enrolledCourses$: Observable<Course[]>;
  private store = inject(Store);

  constructor() {
    this.enrolledCourses$ = this.store.select(selectEnrolledCourses);
  }

  ngOnInit(): void {
    // Ensure courses are loaded in the store
    this.store.dispatch(loadCourses());
  }
}
