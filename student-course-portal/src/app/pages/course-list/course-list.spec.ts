import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { provideRouter } from '@angular/router';
import { CourseList } from './course-list';
import { Course } from '../../models/course.model';

describe('CourseListComponent', () => {
  let component: CourseList;
  let fixture: ComponentFixture<CourseList>;
  let store: MockStore;

  const mockCourses: Course[] = [
    { id: 1, name: 'Angular 15', code: 'ANG', credits: 4, gradeStatus: 'passed' },
    { id: 2, name: 'NgRx State', code: 'NGRX', credits: 3, gradeStatus: 'pending' }
  ];

  beforeEach(async () => {
    // Task 109: Configure TestBed with provideMockStore
    await TestBed.configureTestingModule({
      imports: [CourseList], // CourseList is standalone
      providers: [
        provideRouter([]), // provide routing for routerLink dependencies
        provideMockStore({
          initialState: {
            course: { courses: mockCourses, loading: false, error: null },
            enrollment: { enrolledCourseIds: [] } // CourseCard needs this slice
          }
        })
      ]
    }).compileComponents();

    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(CourseList);
    component = fixture.componentInstance;
  });

  // Task 109: Assert rendered cards match initial state
  it('should render course cards based on initial store state', () => {
    // Trigger change detection to render HTML based on the initial state provided above
    fixture.detectChanges();
    
    // Query for the app-course-card elements
    const cardElements = fixture.debugElement.queryAll(By.css('app-course-card'));
    
    // Since mockCourses has 2 items, we expect 2 cards to be rendered
    expect(cardElements.length).toBe(2);
  });

  // Task 110: Simulate a loading state and assert loading indicator
  it('should display the loading indicator when state.loading is true', () => {
    // Use store.setState to override the initialState and simulate a loading state
    store.setState({ 
      course: { courses: [], loading: true, error: null },
      enrollment: { enrolledCourseIds: [] }
    });
    
    // Trigger change detection to re-evaluate structural directives (e.g., *ngIf)
    fixture.detectChanges();
    
    // Query for the loading message paragraph
    const loadingElement = fixture.debugElement.query(By.css('.loading-msg'));
    
    // Assert the loading element exists in the DOM and contains the expected text
    expect(loadingElement).toBeTruthy();
    expect(loadingElement.nativeElement.textContent).toContain('Loading courses from API');
  });
});
