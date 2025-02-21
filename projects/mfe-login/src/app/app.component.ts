import { loadRemoteModule } from '@angular-architects/native-federation';
import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  DoBootstrap,
  inject,
  Injector,
  OnInit
} from '@angular/core';

import { createCustomElement } from '@angular/elements';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppComponent implements OnInit {
  private injector = inject(Injector);

  async ngOnInit() {
    const elements: any[] = [
      ['ButtonComponent', 'ds-button'],
      ['FieldComponent', 'ds-field'],
    ];

    for (let [name, tag] of elements) {
      const m = await loadRemoteModule({
        remoteEntry: 'http://localhost:4201/remoteEntry.json',
        exposedModule: `./${name}`,
      });

      const element = createCustomElement(m[name], {
        injector: this.injector,
      });

      customElements.define(tag, element);
    }
  }
}
