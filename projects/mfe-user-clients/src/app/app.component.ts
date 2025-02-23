import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  inject,
  Injector,
} from '@angular/core';
import { Router } from '@angular/router';
import { loadRemoteModule } from '@angular-architects/native-federation';
import { createCustomElement } from '@angular/elements';

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
export class AppComponent {
  private readonly router = inject(Router);
  protected readonly store = inject(ClientsStore);
  protected readonly injector = inject(Injector);
  private readonly http = inject(HttpClient);

  protected isSideBarActive: boolean = false;

  constructor() {
    this.loadDsComponents();
  }

  onOpenSideBar(): void {
    this.isSideBarActive = true;
  }

  onLogout(): void {
    this.store.logout();
    this.router.navigate(['/login']);
  }

  onSideBarActiveChange(event: any): void {
    const value = event.detail;
    this.isSideBarActive = value;
  }

  private async loadDsComponents() {
    const elements: any[] = [
      ['ButtonComponent', 'ds-button'],
      ['CardComponent', 'ds-card'],
      ['NavBarComponent', 'ds-nav-bar'],
      ['SideBarComponent', 'ds-side-bar'],
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
