import { CommonModule } from '@angular/common';

import {
  Component,
  Input,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-course-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './course-card.html',
  styleUrl: './course-card.css'
})
export class CourseCard implements OnChanges {

  isExpanded = false;
  isEnrolled = false;

  @Input()
  course: any;
   @Output()
  enrollRequested = new EventEmitter<number>();
  enroll() {
    this.isEnrolled = true;
    this.enrollRequested.emit(this.course.id);
  }
  
  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
  }
  
  get cardClasses() {
    return {
      'card--enrolled': this.isEnrolled,
      'card--full': this.course.credits >= 4,
      'expanded': this.isExpanded
    };
  }

}