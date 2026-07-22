import { Component } from '@angular/core';
import { NotificationService } from '../../services/notification.service';
import { NgFor, NgIf } from '@angular/common';

/**
 * Task 67: NotificationComponent — provides NotificationService at COMPONENT level.
 *
 * WHY providers: [NotificationService] HERE creates a new instance:
 * Angular's DI hierarchy works like a tree. When a service is provided at
 * component level (not 'root'), Angular creates a fresh instance specifically
 * for that component subtree. Any other component that injects NotificationService
 * at root would get the root singleton — but here, this component gets its OWN
 * private instance, completely isolated from the root injector.
 * This is useful for stateful services (like a per-widget notification queue)
 * where you don't want shared global state.
 */
@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [NgFor, NgIf],
  providers: [NotificationService], // Component-level provider — separate instance!
  template: `
    <div class="notification-panel">
      <h4>🔔 Notifications (component-scoped)</h4>
      <ul *ngFor="let msg of ns.getMessages()">
        <li>{{ msg }}</li>
      </ul>
      <p *ngIf="ns.getMessages().length === 0" class="empty">No notifications.</p>
      <button (click)="addDemo()">Add Demo Notification</button>
    </div>
  `,
  styles: [`
    .notification-panel {
      background: #fefce8;
      border: 1px solid #fde047;
      border-radius: 8px;
      padding: 16px;
      margin-top: 24px;
    }
    h4 { margin: 0 0 12px; color: #854d0e; }
    ul { padding-left: 20px; }
    li { margin: 4px 0; color: #78350f; }
    .empty { color: #a16207; font-style: italic; }
    button {
      margin-top: 10px;
      padding: 6px 14px;
      background: #eab308;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      font-weight: 600;
    }
  `]
})
export class NotificationComponent {
  constructor(public ns: NotificationService) {}

  addDemo(): void {
    this.ns.addMessage('Demo notification at ' + new Date().toLocaleTimeString());
  }
}
