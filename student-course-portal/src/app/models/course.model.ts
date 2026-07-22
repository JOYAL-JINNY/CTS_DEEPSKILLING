// Task 59: Course interface — provides compile-time type checking across
// the entire application. Avoids 'any' type and catches mismatches early.
export interface Course {
  id: number;
  name: string;
  code: string;
  credits: number;
  /** Task 27: gradeStatus drives the badge colour in CourseCardComponent */
  gradeStatus: 'passed' | 'failed' | 'pending';
  /** Task 29: enrolled flag used by ngClass to apply card--enrolled class */
  enrolled?: boolean;
}
