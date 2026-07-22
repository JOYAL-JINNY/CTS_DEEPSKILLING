import { Component, OnInit, inject } from '@angular/core';
import { NgFor, NgIf, AsyncPipe } from '@angular/common';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CourseCard } from '../../components/course-card/course-card';
import { Course } from '../../models/course.model';
import { loadCourses } from '../../store/course/course.actions';
import { selectAllCourses, selectCoursesLoading, selectCoursesError } from '../../store/course/course.selectors';

@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [CourseCard, NgFor, NgIf, AsyncPipe],
  templateUrl: './course-list.html',
  styleUrl: './course-list.css',
})
export class CourseList implements OnInit {
  // Task 96: Replace service subscription with Store Observables
  courses$: Observable<Course[]>;
  isLoading$: Observable<boolean>;
  error$: Observable<string | null>;

  selectedCourseId: number | null = null;
  private store = inject(Store);
  private router = inject(Router);

  constructor() {
    // Task 96: Select data from store
    this.courses$ = this.store.select(selectAllCourses);
    this.isLoading$ = this.store.select(selectCoursesLoading);
    this.error$ = this.store.select(selectCoursesError);
  }

  ngOnInit(): void {
    // Task 96: Dispatch load action
    this.store.dispatch(loadCourses());
  }

  onEnroll(courseId: number) {
    console.log('Enrolling in course: ' + courseId);
    this.selectedCourseId = courseId;
  }

  trackByCourseId(index: number, course: Course): number {
    return course.id;
  }

  navigateToDetail(courseId: number): void {
    this.router.navigate(['courses', courseId]);
  }
}
