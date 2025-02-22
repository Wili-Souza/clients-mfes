import { computed, inject, InjectionToken, Injector } from '@angular/core';
import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';

import { ClientService } from '../../data/services/client.service';
import { Client } from '../../shared/models/client';
import { loadRemoteModule } from '@angular-architects/native-federation';
import { from, Observable, switchMap, tap } from 'rxjs';

type ClientsState = {
  clients: Client[];
  selectedClient: Client | undefined;
  storage: any | undefined;
  pagination: {
    limit: number;
    totalPages: number;
    page: number;
  };
};

const initialState: ClientsState = {
  selectedClient: undefined,
  storage: undefined,
  clients: [],
  pagination: {
    limit: 16,
    totalPages: 0,
    page: 1,
  },
};

const CLIENTS_STATE = new InjectionToken<ClientsState>('UsersState', {
  factory: () => initialState,
});

export const ClientsStore = signalStore(
  withState(() => inject(CLIENTS_STATE)),

  withMethods(
    (
      store,
      clientService = inject(ClientService),
      injector = inject(Injector)
    ) => ({
      getClients(): void {
        const { page, limit } = store.pagination();
        clientService.getAll(page, limit).subscribe({
          next: ({ clients, totalPages }) =>
            patchState(store, () => ({
              clients,
              pagination: { ...store.pagination(), totalPages },
            })),
        });
      },
      createClient(client: Partial<Client>): void {
        clientService.create(client).subscribe({
          next: () => this.getClients(),
        });
      },
      setItemPerPage(limit: number): void {
        patchState(store, () => ({
          pagination: { ...store.pagination(), limit },
        }));
        this.getClients();
      },
      setPage(page: number): void {
        patchState(store, () => ({
          pagination: { ...store.pagination(), page },
        }));
        this.getClients();
      },
      fetchStorageService(): Observable<any> {
        return from(
          loadRemoteModule({
            remoteName: 'shell',
            exposedModule: './ClientsStorageService',
          })
        ).pipe(
          tap((m) => {
            const storage = injector.get<any>(m.ClientsStorageService);
            patchState(store, () => ({ storage }));
          })
        );
      },
    })
  ),

  withHooks({
    onInit(store) {
      store.fetchStorageService().subscribe({
        next: () => store.getClients(),
        error: (err) => console.log(`Error: ${err}`),
      });
    },
  })
);
