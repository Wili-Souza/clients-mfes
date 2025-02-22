import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, Injector } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { loadRemoteModule } from '@angular-architects/native-federation';
import { createCustomElement } from '@angular/elements';

import { ClientsStore } from './core/store/clients.store';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  providers: [ClientsStore],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppComponent {
  protected readonly store = inject(ClientsStore);
  protected readonly injector = inject(Injector);

  constructor() {
    this.loadDsComponents();
  }

  private async loadDsComponents() {
    const elements: any[] = [
      ['ButtonComponent', 'ds-button'],
      ['CardComponent', 'ds-card'],
    ];

    for (let [name, tag] of elements) {
      if (customElements.get(tag)) continue;

      const m = await loadRemoteModule({
        remoteName: 'mfeDs',
        exposedModule: `./${name}`,
      });

      const element = createCustomElement(m[name], {
        injector: this.injector,
      });

      customElements.define(tag, element);
    }
  }
}
