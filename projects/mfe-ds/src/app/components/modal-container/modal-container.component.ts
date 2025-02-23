import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, inject, Output } from '@angular/core';

@Component({
  selector: 'app-modal-container',
  imports: [CommonModule],
  templateUrl: './modal-container.component.html',
  styleUrl: './modal-container.component.scss',
})
export class ModalContainerComponent {
  @Output() close = new EventEmitter();

  private readonly http = inject(HttpClient);
  protected assetsUrl?: string;

  constructor() {
    this.loadAppConfig();
  }

  onClose(): void {
    this.close.emit();
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
