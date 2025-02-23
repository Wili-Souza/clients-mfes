import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';

export interface Option {
  label: string;
  value: any;
}

@Component({
  selector: 'app-select',
  imports: [CommonModule],
  templateUrl: './select.component.html',
  styleUrl: './select.component.scss',
})
export class SelectComponent implements OnChanges {
  @Input() value?: string;
  @Input() options: Option[] = [];
  @Output() readonly selection = new EventEmitter<any>();

  private readonly http = inject(HttpClient);

  protected isActive: boolean = false;
  protected valueSelected: string = '';
  protected assetsUrl?: string;

  constructor() {
    this.loadAppConfig();
  }

  ngOnChanges(changes: SimpleChanges): void {
    const valueChange = changes['value']?.currentValue;
    if (valueChange) {
      const option = this.options.find((op) => op.value === valueChange);
      if (option) this.onOptionSelected(option);
    }
  }

  onToggleOptions(): void {
    this.isActive = !this.isActive;
  }

  onOptionSelected(option: Option): void {
    this.valueSelected = option.label;
    this.selection.emit(option.value);
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
