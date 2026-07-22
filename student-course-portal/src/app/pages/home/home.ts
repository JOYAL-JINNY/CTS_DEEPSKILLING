import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AsyncPipe, NgIf } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { selectAllCourses } from '../../store/course/course.selectors';
import { selectEnrolledIds } from '../../store/enrollment/enrollment.selectors';
import { loadCourses } from '../../store/course/course.actions';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule, AsyncPipe, NgIf],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  portalName = 'Student Course Portal';
  isPortalActive = true;
  message = '';
  searchTerm = '';

  private store = inject(Store);
  
  // Observables mapped to lengths
  coursesCount$: Observable<number>;
  enrolledCount$: Observable<number>;

  constructor() {
    this.coursesCount$ = this.store.select(selectAllCourses).pipe(map(courses => courses.length));
    this.enrolledCount$ = this.store.select(selectEnrolledIds).pipe(map(ids => ids.length));
  }

  ngOnInit() {
    // Dispatch load action just in case user lands on Home first
    this.store.dispatch(loadCourses());
  }

  onEnrollClick() {
    this.message = 'Enrollment opened!';
  }
}
