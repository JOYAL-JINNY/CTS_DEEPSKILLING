import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

/**
 * Task 91: LoadingService — provides a global loading state.
 * The isLoading$ BehaviorSubject emits true/false to show/hide a global spinner.
 */
@Injectable({ providedIn: 'root' })
export class LoadingService {
  private isLoadingSubject = new BehaviorSubject<boolean>(false);
  isLoading$ = this.isLoadingSubject.asObservable();

  setLoading(isLoading: boolean): void {
    this.isLoadingSubject.next(isLoading);
  }
}
