import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientsStore } from './core/store/clients.store';

@Component({
  selector: 'app-root',
  imports: [CommonModule],
  providers: [ClientsStore],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  protected readonly store = inject(ClientsStore);
}
