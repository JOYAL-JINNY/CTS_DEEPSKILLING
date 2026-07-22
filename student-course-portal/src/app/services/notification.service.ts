import { Injectable } from '@angular/core';

/**
 * Task 67: NotificationService — intentionally NOT provided at root.
 * It will be provided at component level via providers: [NotificationService]
 * in the @Component decorator of NotificationComponent.
 *
 * This means each component that declares it in its providers array gets
 * its OWN separate instance — demonstrating the DI hierarchy.
 */
@Injectable()
export class NotificationService {
  private messages: string[] = [];

  addMessage(msg: string): void {
    this.messages.push(msg);
    console.log('[NotificationService] Message added:', msg);
  }

  getMessages(): string[] {
    return this.messages;
  }

  clear(): void {
    this.messages = [];
  }
}
