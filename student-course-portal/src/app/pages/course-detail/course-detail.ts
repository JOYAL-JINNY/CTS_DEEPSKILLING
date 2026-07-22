import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NgIf, TitleCasePipe } from '@angular/common';
import { CourseService } from '../../services/course.service';
import { Course } from '../../models/course.model';

@Component({
  selector: 'app-course-detail',
  standalone: true,
  imports: [NgIf, RouterLink, TitleCasePipe],
  templateUrl: './course-detail.html',
  styleUrl: './course-detail.css',
})
export class CourseDetail implements OnInit {
  course: Course | undefined;
  notFound = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private courseService: CourseService
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    const id = idParam ? parseInt(idParam, 10) : NaN;
    
    // Subscribe to the observable returned by getCourseById
    this.courseService.getCourseById(id).subscribe({
      next: (course) => {
        this.course = course;
        if (!this.course) this.notFound = true;
      },
      error: () => this.notFound = true
    });
  }

  goBack(): void {
    this.router.navigate(['/courses']);
  }
}
