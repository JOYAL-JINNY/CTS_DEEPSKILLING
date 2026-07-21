
import { FormsModule } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
// [property] → One-way binding (Component → View)
// [(ngModel)] → Two-way binding (Component ↔ View)
export class Home implements OnInit, OnDestroy {
  portalName = 'Student Course Portal';

  isPortalActive = true;

  message = '';

  searchTerm = '';

  courseCount = 0;

ngOnInit() {
  this.courseCount = 12;
  console.log("HomeComponent initialised — courses loaded");
}

ngOnDestroy() {
  console.log("HomeComponent destroyed");
}
  onEnrollClick() {
    this.message = 'Enrollment opened!';
  }
}
