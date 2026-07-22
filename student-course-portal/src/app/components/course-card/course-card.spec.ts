import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { SimpleChange, SimpleChanges } from '@angular/core';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { CourseCard } from './course-card';
import { Course } from '../../models/course.model';

describe('CourseCardComponent', () => {
  let component: CourseCard;
  let fixture: ComponentFixture<CourseCard>;
  let store: MockStore;

  const mockCourse: Course = {
    id: 1,
    name: 'Data Structures',
    code: 'CS101',
    credits: 4,
    gradeStatus: 'passed'
  };

  beforeEach(async () => {
    // Task 101: Configure TestBed for CourseCard Component
    // Since we added NgRx in Task 100, we must provideMockStore here.
    await TestBed.configureTestingModule({
      imports: [CourseCard], // Standalone component
      providers: [
        provideMockStore({
          initialState: {
            enrollment: { enrolledCourseIds: [] } // Mock initial NgRx state
          }
        })
      ]
    }).compileComponents();

    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(CourseCard);
    component = fixture.componentInstance;
    
    // Provide a valid default course so change detection doesn't crash before our tests
    component.course = { ...mockCourse };
  });

  // Task 102: Write a test that verifies the component is created
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Task 103: Test for @Input rendering
  it('should display the course name from @Input', () => {
    component.course = { 
      id: 1, 
      name: 'Data Structures', 
      code: 'CS101', 
      credits: 4, 
      gradeStatus: 'passed' 
    };
    
    // fixture.detectChanges() triggers Angular's change detection
    fixture.detectChanges();
    
    // By.css() is the Angular way to query the rendered DOM in tests
    const h3Element = fixture.debugElement.query(By.css('h3')).nativeElement;
    expect(h3Element.textContent).toContain('Data Structures');
  });

  // Task 104: Test for @Output and click handling
  it('should emit enrollRequested on button click', () => {
    component.course = mockCourse;
    fixture.detectChanges();
    
    // Spy on the EventEmitter's emit method
    spyOn(component.enrollRequested, 'emit');
    
    // Trigger the click event on the enroll button
    const button = fixture.debugElement.query(By.css('.btn-enroll')).nativeElement;
    button.click();
    
    fixture.detectChanges();
    
    // Assert that the output emitted the course id
    expect(component.enrollRequested.emit).toHaveBeenCalledWith(1);
  });

  // Task 105: Test for ngOnChanges
  it('should log previous and current values in ngOnChanges', () => {
    // Spy on console.log
    spyOn(console, 'log');

    const previousValue = undefined;
    const currentValue = mockCourse;
    
    const changes: SimpleChanges = {
      course: new SimpleChange(previousValue, currentValue, true)
    };

    // Call ngOnChanges manually
    component.ngOnChanges(changes);

    // Verify console logs were called correctly
    expect(console.log).toHaveBeenCalledWith('ngOnChanges fired for CourseCard:');
    expect(console.log).toHaveBeenCalledWith('  Previous value:', previousValue);
    expect(console.log).toHaveBeenCalledWith('  Current value:', currentValue);
  });
});
