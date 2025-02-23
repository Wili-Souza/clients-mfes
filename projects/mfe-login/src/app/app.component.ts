import { loadRemoteModule } from '@angular-architects/native-federation';
import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  inject,
  Injector,
  OnInit,
} from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import { ClientsStore } from './core/store/clients.store';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  imports: [],
  providers: [ClientsStore],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppComponent implements OnInit {
  private readonly injector = inject(Injector);
  private readonly router = inject(Router);
  protected readonly store = inject(ClientsStore);
  protected readonly http = inject(HttpClient);

  protected readonly nameControl = new FormControl();

  constructor() {
    this.loadFontFromDesignSystem();
  }

  async ngOnInit() {
    this.loadDsComponents();
  }

  onSubmit(name: string): void {
    this.store.setUserName(name);
    this.router.navigate(['/clients']);
  }

  private async loadDsComponents() {
    const elements: any[] = [
      ['ButtonComponent', 'ds-button'],
      ['FieldComponent', 'ds-field'],
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

  loadFontFromDesignSystem(): void {
    this.http.get('config.json').subscribe({
      next: (data: any) => {
        const assetsUrl = data.assetsUrl as string;
        const fontStyle = document.createElement('style');
        fontStyle.appendChild(
          document.createTextNode(
            `@font-face {
              font-family: 'Inter';
              src: url('"${assetsUrl}'/fonts/Inter-VariableFont_opsz,wght.ttf") format("truetype");\
              font-weight: 100 900;
              font-style: normal;
            }`
          )
        );
        document.head.appendChild(fontStyle);
      },
      error: (error: Error) => {
        console.log(error);
      },
    });
  }
}
