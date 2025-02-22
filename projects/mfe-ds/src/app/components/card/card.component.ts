import { CurrencyPipe, registerLocaleData } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import localePt from '@angular/common/locales/pt';
import { LOCALE_ID } from '@angular/core';

registerLocaleData(localePt);

@Component({
  selector: 'app-card',
  imports: [CurrencyPipe],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'pt-BR',
    },
    CurrencyPipe,
  ],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {
  @Input({ required: true }) name?: string;
  @Input({ required: true }) salary?: number;
  @Input({ required: true }) companyValuation?: number;
  @Input() readonly: boolean = true;

  @Output() add = new EventEmitter<void>();
  @Output() edit = new EventEmitter<void>();
  @Output() remove = new EventEmitter<void>();
  @Output() unselect = new EventEmitter<void>();
}
