import { CommonModule, CurrencyPipe, registerLocaleData } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import localePt from '@angular/common/locales/pt';
import { LOCALE_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';

registerLocaleData(localePt);

@Component({
  selector: 'app-card',
  imports: [CurrencyPipe, CommonModule],
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
  @Input() selected: boolean = false;
  @Input() readOnly: boolean = true;

  @Output() add = new EventEmitter<void>();
  @Output() edit = new EventEmitter<void>();
  @Output() remove = new EventEmitter<void>();
  @Output() unselect = new EventEmitter<void>();

  private readonly http = inject(HttpClient);
  protected assetsUrl?: string;

  constructor() {
    this.loadAppConfig();
  }

  async loadAppConfig(): Promise<void> {
    const configFilePath = 'config.json';
    return new Promise((resolve, reject) => {
      return this.http.get(configFilePath).subscribe({
        next: (data: any) => {
          this.assetsUrl = data.assetsUrl as string;
          resolve();
        },
        error: (error: Error) => {
          reject(error);
        },
      });
    });
  }
}
