import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError, tap, retry } from 'rxjs/operators';
import { Course } from '../models/course.model';

/**
 * Task 58/78: CourseService — now uses HttpClient to fetch data from json-server.
 */
@Injectable({ providedIn: 'root' })
export class CourseService {
  private apiUrl = 'http://localhost:3000/courses';

  // Task 78: Inject HttpClient
  constructor(private http: HttpClient) {}

  /** 
   * Task 79: getCourses returning Observable<Course[]> 
   * Task 83: map operator filters out courses with 0 credits.
   * Task 86: retry(2) retries failed HTTP requests up to 2 times.
   * Task 84: catchError handles the error and returns a user-friendly message.
   * Task 85: tap logs the successful fetch without altering the stream.
   *   (tap is preferred over side effects inside map because map's purpose is 
   *    pure transformation. Mixing side effects in map makes it hard to test 
   *    and violates functional programming principles.)
   */
  getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(this.apiUrl).pipe(
      retry(2),
      map(courses => courses.filter(c => c.credits > 0)),
      tap(courses => console.log('Courses loaded:', courses.length)),
      catchError(err => {
        console.error('HTTP Error in getCourses:', err);
        return throwError(() => new Error('Failed to load courses. Please try again.'));
      })
    );
  }

  /** Task 79: getCourseById returning Observable<Course> */
  getCourseById(id: number): Observable<Course> {
    return this.http.get<Course>(`${this.apiUrl}/${id}`);
  }

  /** Task 81: POST method to create a course */
  createCourse(course: Omit<Course, 'id'>): Observable<Course> {
    return this.http.post<Course>(this.apiUrl, course);
  }

  /** Task 82: PUT method to update a course */
  updateCourse(id: number, course: Course): Observable<Course> {
    return this.http.put<Course>(`${this.apiUrl}/${id}`, course);
  }

  /** Task 82: DELETE method to delete a course */
  deleteCourse(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
