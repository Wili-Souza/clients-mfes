import {
  Directive,
  ElementRef,
  Output,
  EventEmitter,
  HostListener,
  inject,
  Input,
} from '@angular/core';

@Directive({
  selector: '[clickOutside]',
})
export class ClickOutsideDirective {
  private elementRef = inject(ElementRef);

  @Input() exceptionClassName?: string;

  @Output()
  public clickOutside = new EventEmitter<MouseEvent>();

  @HostListener('document:mouseup', ['$event', '$event.target'])
  public onClick(event: MouseEvent, targetElement: HTMLElement): void {
    if (!targetElement) return;

    var elementClass: any = targetElement.className;
    if (!(typeof elementClass === 'string')) elementClass = '';

    const clickedInside = this.elementRef.nativeElement.contains(targetElement);

    if (
      !clickedInside &&
      (!this.exceptionClassName ||
        !elementClass.includes(this.exceptionClassName))
    ) {
      this.clickOutside.emit(event);
    }
  }
}
