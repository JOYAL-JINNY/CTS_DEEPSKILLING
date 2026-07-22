import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { CourseService } from './course.service';
import { Course } from '../models/course.model';

describe('CourseService', () => {
  let service: CourseService;
  let httpMock: HttpTestingController;

  const mockCourses: Course[] = [
    { id: 1, name: 'Angular', code: 'ANG', credits: 4, gradeStatus: 'passed' },
    { id: 2, name: 'React', code: 'REA', credits: 3, gradeStatus: 'pending' }
  ];

  beforeEach(() => {
    // Task 106: Configure TestBed with HttpClientTestingModule equivalents for modern Angular
    TestBed.configureTestingModule({
      providers: [
        CourseService,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });

    // Task 106: Inject both the service and HttpTestingController
    service = TestBed.inject(CourseService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // Assert no unexpected requests were made
    httpMock.verify();
  });

  // Task 107: Test getCourses()
  it('should fetch courses via GET', () => {
    // Call the service method
    service.getCourses().subscribe(courses => {
      // Assert that we got the expected number of courses back
      // Note: The service filters out courses with 0 credits, our mock has > 0
      expect(courses.length).toBe(2);
      expect(courses).toEqual(mockCourses);
    });

    // Expect exactly one request to the API
    const req = httpMock.expectOne('http://localhost:3000/courses');
    expect(req.request.method).toBe('GET');

    // Flush the mock response
    req.flush(mockCourses);
  });

  // Task 108: Test for error handling
  it('should handle 500 error on getCourses', () => {
    service.getCourses().subscribe({
      next: () => fail('Should have failed with the 500 error'),
      error: (error: Error) => {
        // Assert the Observable emits an error with the expected message
        expect(error.message).toBe('Failed to load courses. Please try again.');
      }
    });

    const req = httpMock.expectOne('http://localhost:3000/courses');
    
    // Simulate a 500 server error
    req.flush('Internal Server Error', { status: 500, statusText: 'Server Error' });
  });
});
