import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  imports: [RouterModule, CommonModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss',
})
export class NavBarComponent {
  @Input() userName?: string;
  @Output() readonly logout = new EventEmitter<void>();
  @Output() readonly openMenu = new EventEmitter<void>();

  protected readonly router = inject(Router);
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
