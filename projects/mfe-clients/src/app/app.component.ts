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
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { ClientsStore } from './core/store/clients.store';
import { Client } from './shared/models/client';
import { PAGE_LIMIT_OPTIONS } from './core/core.constants';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

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
  private readonly router = inject(Router);
  private readonly http = inject(HttpClient);

  protected isSideBarActive: boolean = false;
  protected addClientModalActive: boolean = false;
  protected deleteClientModalActive: boolean = false;
  protected editClientModalActive: boolean = false;
  protected readonly clientForm = new FormGroup({
    name: new FormControl<string>('', Validators.required),
    salary: new FormControl<number>(0, Validators.required),
    companyValuation: new FormControl<number>(0, Validators.required),
  });

  protected readonly pageLimitOptions = PAGE_LIMIT_OPTIONS.map((op) => ({
    label: String(op),
    value: op,
  }));

  protected readonly limitControl = new FormControl(
    this.store.pagination().limit
  );

  constructor() {
    this.loadFontFromDesignSystem();
  }

  ngOnInit(): void {
    this.loadDsComponents();
  }

  onOpenSideBar(): void {
    this.isSideBarActive = true;
  }

  onSideBarActiveChange(event: any): void {
    const value = event.detail;
    this.isSideBarActive = value;
  }

  onLogout(): void {
    this.store.logout();
    this.router.navigate(['/login']);
  }

  onPageLimitSelected(event: any): void {
    const value = event.detail as number;
    this.store.setItemPerPage(value);
  }

  onPageSelected(event: any): void {
    const value = event.detail as number;
    this.store.setPage(value);
  }

  onCreateClient(): void {
    this.addClientModalActive = true;
  }

  onCloseAddClientModal(): void {
    this.clientForm.reset({ name: '', salary: 0, companyValuation: 0 });
    this.addClientModalActive = false;
  }

  onSubmitCreateClient(): void {
    if (this.clientForm.invalid) return;
    const client = this.clientForm.value as Partial<Client>;
    this.store.createClient(client);
    this.onCloseAddClientModal();
  }

  onEditClient(client: Client): void {
    this.store.selectClient(client);
    this.clientForm.patchValue(client);
    this.editClientModalActive = true;
  }

  onCloseEditClientModal(): void {
    this.clientForm.reset({ name: '', salary: 0, companyValuation: 0 });
    this.editClientModalActive = false;
  }

  onSubmitEditClient(): void {
    if (this.clientForm.invalid) return;
    const client = this.clientForm.value as Partial<Client>;
    this.store.editClient(client);
    this.onCloseEditClientModal();
  }

  onDeleteClient(client: Client): void {
    this.store.selectClient(client);
    this.deleteClientModalActive = true;
  }

  onCloseDeleteClientModal(): void {
    this.deleteClientModalActive = false;
  }

  onSubmitDeleteClient(): void {
    this.store.deleteSelectedClient();
    this.onCloseDeleteClientModal();
  }

  private async loadDsComponents() {
    const elements: any[] = [
      ['ButtonComponent', 'ds-button'],
      ['CardComponent', 'ds-card'],
      ['FieldComponent', 'ds-field'],
      ['ModalContainerComponent', 'ds-modal-container'],
      ['SelectComponent', 'ds-select'],
      ['PaginatorComponent', 'ds-paginator'],
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
