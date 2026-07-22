import { Component, Input, Output, EventEmitter, inject, OnInit } from '@angular/core';
import { NgClass, NgStyle, NgSwitch, NgSwitchCase, NgSwitchDefault, NgIf, AsyncPipe, TitleCasePipe } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { HighlightDirective } from '../../directives/highlight.directive';
import { CreditLabelPipe } from '../../pipes/credit-label.pipe';
import { Course } from '../../models/course.model';
import { enrollInCourse, unenrollFromCourse } from '../../store/enrollment/enrollment.actions';
import { selectEnrolledIds } from '../../store/enrollment/enrollment.selectors';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-course-card',
  standalone: true,
  imports: [NgClass, NgStyle, NgSwitch, NgSwitchCase, NgSwitchDefault, NgIf, AsyncPipe, TitleCasePipe, HighlightDirective, CreditLabelPipe],
  templateUrl: './course-card.html',
  styleUrl: './course-card.css',
})
export class CourseCard implements OnInit {
  @Input() course!: Course;
  @Output() enrollRequested = new EventEmitter<number>();

  isExpanded = false;
  
  // Task 100: NgRx Store injected
  private store = inject(Store);
  enrolledIds$: Observable<number[]>;

  constructor() {
    this.enrolledIds$ = this.store.select(selectEnrolledIds);
  }

  ngOnInit() {}

  toggleExpand(): void {
    this.isExpanded = !this.isExpanded;
  }

  // Task 100: Dispatch NgRx action instead of calling service
  onEnrollToggle(event: Event): void {
    event.stopPropagation(); // Prevent card click (navigation) when clicking enroll
    
    this.enrolledIds$.pipe(take(1)).subscribe(ids => {
      if (ids.includes(this.course.id)) {
        this.store.dispatch(unenrollFromCourse({ courseId: this.course.id }));
      } else {
        this.store.dispatch(enrollInCourse({ courseId: this.course.id }));
      }
      this.enrollRequested.emit(this.course.id);
    });
  }

  get cardClasses(): Record<string, boolean> {
    return {
      'card--full': this.course.credits >= 4,
      'expanded': this.isExpanded,
    };
  }

  get borderStyle(): Record<string, string> {
    const colourMap: Record<string, string> = {
      passed:  '#22c55e',
      failed:  '#ef4444',
      pending: '#9ca3af',
    };
    return {
      'border-left': `4px solid ${colourMap[this.course.gradeStatus] ?? '#9ca3af'}`,
    };
  }
}
