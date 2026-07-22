import { Pipe, PipeTransform } from '@angular/core';

/**
 * Task 35: creditLabel pipe — transforms a credits number into a human-readable string.
 *   null / 0   → 'No Credits'
 *   1          → '1 Credit'
 *   2+         → 'N Credits'
 *
 * Task 36: Used in CourseCardComponent template: {{ course.credits | creditLabel }}
 */
@Pipe({
  name: 'creditLabel',
  standalone: true,
})
export class CreditLabelPipe implements PipeTransform {
  transform(value: number | null | undefined): string {
    if (value === null || value === undefined || value === 0) {
      return 'No Credits';
    }
    return value === 1 ? '1 Credit' : `${value} Credits`;
  }
}
