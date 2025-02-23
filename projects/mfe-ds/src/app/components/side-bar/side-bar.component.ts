import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

import { ClickOutsideDirective } from './click-outside.directive';

@Component({
  selector: 'app-side-bar',
  imports: [RouterModule, ClickOutsideDirective, CommonModule],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.scss',
})
export class SideBarComponent {
  @Input() active: boolean = false;
  @Output() activeChange = new EventEmitter<boolean>();

  private readonly http = inject(HttpClient);
  protected assetsUrl?: string;

  constructor() {
    this.loadAppConfig();
  }

  onClickOutside(): void {
    this.activeChange.emit(false);
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
