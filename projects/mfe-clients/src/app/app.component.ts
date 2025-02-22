import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  inject,
  Injector,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { loadRemoteModule } from '@angular-architects/native-federation';
import { createCustomElement } from '@angular/elements';

import { ClientsStore } from './core/store/clients.store';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [CommonModule, ReactiveFormsModule],
  providers: [ClientsStore],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppComponent implements OnInit {
  protected readonly store = inject(ClientsStore);
  private readonly injector = inject(Injector);

  protected readonly limitControl = new FormControl(
    this.store.pagination().limit
  );

  ngOnInit(): void {
    this.loadDsComponents();
  }

  private async loadDsComponents() {
    const elements: any[] = [
      ['ButtonComponent', 'ds-button'],
      ['CardComponent', 'ds-card'],
    ];

    for (let [name, tag] of elements) {
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
