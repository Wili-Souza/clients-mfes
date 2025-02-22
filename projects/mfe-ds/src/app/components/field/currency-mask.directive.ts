import {
  Directive,
  ElementRef,
  inject,
  Input,
  OnDestroy,
  Renderer2,
} from '@angular/core';
import { FormControl } from '@angular/forms';

@Directive({
  selector: '[appCurrencyMask]',
})
export class CurrencyMaskDirective implements OnDestroy {
  @Input({ required: true }) control!: FormControl;

  private readonly renderer = inject(Renderer2);
  private readonly el = inject(ElementRef);

  private inputListener: () => void;

  constructor() {
    this.inputListener = this.renderer.listen(
      this.el.nativeElement,
      'input',
      (event: Event) => {
        const value = (event.target as HTMLInputElement).value;
        this.control.patchValue(this.format(value));
      }
    );
  }

  private format(value: string): number {
    const valueWithoutSymbol = value.replaceAll('R$', '').trim();
    const valueString = valueWithoutSymbol
      .replaceAll('.', '')
      .replaceAll(',', '.');
    const valueNum = Number(valueString);
    return Number.isNaN(valueNum) ? 0 : valueNum;
  }

  ngOnDestroy(): void {
    this.inputListener();
  }
}
