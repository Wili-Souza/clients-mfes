import {
  Directive,
  ElementRef,
  Output,
  EventEmitter,
  HostListener,
  inject,
} from '@angular/core';

@Directive({
  selector: '[clickOutside]',
})
export class ClickOutsideDirective {
  private elementRef = inject(ElementRef);

  @Output()
  public clickOutside = new EventEmitter<MouseEvent>();

  @HostListener('document:mouseup', ['$event', '$event.target'])
  public onClick(event: MouseEvent, targetElement: HTMLElement): void {
    if (!targetElement) return;

    var elementClass: any = targetElement.className;
    if (!(typeof elementClass === 'string')) elementClass = '';

    const clickedInside = this.elementRef.nativeElement.contains(targetElement);

    if (!clickedInside) {
      this.clickOutside.emit(event);
    }
  }
}
