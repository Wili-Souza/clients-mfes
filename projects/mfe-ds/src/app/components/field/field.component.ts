import { CurrencyPipe, registerLocaleData } from '@angular/common';
import { Component, Input, LOCALE_ID } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import localePt from '@angular/common/locales/pt';
import { CurrencyMaskDirective } from './currency-mask.directive';

export type InputType = 'text' | 'number' | 'password';
export type InputSize = 'small' | 'medium' | 'large';

@Component({
  selector: 'app-field',
  imports: [ReactiveFormsModule, CurrencyPipe, CurrencyMaskDirective],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'pt-BR',
    },
  ],
  templateUrl: './field.component.html',
  styleUrl: './field.component.scss',
})
export class FieldComponent {
  @Input() type: InputType = 'text';
  @Input() placeholder?: string;
  @Input() control: FormControl = new FormControl();
  @Input() size: InputSize = 'medium';

  constructor() {
    registerLocaleData(localePt);
  }

  formatValue() {
    const value = this.control.value;
    if (value !== null) {
      const formatted = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }).format(value);
      this.control.setValue(formatted, { emitEvent: false });
    }
  }

  restoreValue() {
    const rawValue = this.control.value;
    if (typeof rawValue === 'string') {
      const numericValue = Number(rawValue.replace(/\D+/g, '')) / 100;
      this.control.setValue(numericValue, { emitEvent: false });
    }
  }
}
