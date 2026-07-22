import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

/**
 * Task 68: NotFoundComponent — shown for any unknown route (** wildcard).
 * The wildcard route must always be last in the routes array — Angular matches
 * routes in order, so placing ** first would catch every URL.
 */
@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="not-found-container">
      <h1 class="code">404</h1>
      <h2>Page Not Found</h2>
      <p>The page you are looking for doesn't exist or has been moved.</p>
      <a routerLink="/" class="btn-home">Go to Home</a>
    </div>
  `,
  styles: [`
    .not-found-container {
      text-align: center;
      padding: 80px 20px;
    }
    .code {
      font-size: 6rem;
      font-weight: 800;
      color: #e5e7eb;
      margin: 0;
      line-height: 1;
    }
    h2 { color: #1e293b; margin-top: 8px; }
    p  { color: #6b7280; margin: 12px 0 28px; }
    .btn-home {
      display: inline-block;
      padding: 10px 24px;
      background: #3b82f6;
      color: #fff;
      border-radius: 8px;
      text-decoration: none;
      font-weight: 600;
    }
  `]
})
export class NotFound {}
