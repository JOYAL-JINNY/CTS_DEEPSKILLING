import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

/**
 * Task 33: appHighlight directive — adds a background highlight on mouseenter,
 * removes it on mouseleave. Uses @HostListener to bind DOM events declaratively.
 *
 * Task 37: The highlight colour is configurable via @Input() appHighlight.
 * Usage:  <app-course-card appHighlight>          → yellow (default)
 *         <app-course-card appHighlight="lightblue"> → lightblue
 */
@Directive({
  selector: '[appHighlight]',
  standalone: true,
})
export class HighlightDirective {
  /** Task 37: Caller can pass a custom colour string; defaults to 'yellow' */
  @Input() appHighlight = 'yellow';

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  /** Task 33: Apply background on hover */
  @HostListener('mouseenter')
  onMouseEnter(): void {
    this.renderer.setStyle(this.el.nativeElement, 'backgroundColor', this.appHighlight);
    this.renderer.setStyle(this.el.nativeElement, 'transition', 'background-color 0.3s ease');
  }

  /** Task 33: Remove background when mouse leaves */
  @HostListener('mouseleave')
  onMouseLeave(): void {
    this.renderer.removeStyle(this.el.nativeElement, 'backgroundColor');
  }
}
