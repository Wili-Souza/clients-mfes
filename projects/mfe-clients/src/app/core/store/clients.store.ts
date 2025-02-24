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
import { from, Observable, tap } from 'rxjs';

type ClientsState = {
  userName: string | undefined;
  clients: Client[];
  selectedClient: Client | undefined;
  addedClientsMap: Map<number, Client>;
  storage: any | undefined;
  pagination: {
    limit: number;
    totalPages: number;
    page: number;
  };
};

const initialState: ClientsState = {
  userName: undefined,
  selectedClient: undefined,
  addedClientsMap: new Map(),
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

  withComputed(({ addedClientsMap }) => ({
    addedClientsList: computed(() => [...addedClientsMap().values()]),
    addedClientsIds: computed(() => [...addedClientsMap().keys()]),
  })),

  withMethods(
    (
      store,
      clientService = inject(ClientService),
      injector = inject(Injector)
    ) => ({
      getUserName(): void {
        if (!store.storage()) return;
        const userName = store.storage().getUserName();
        patchState(store, () => ({
          userName: userName ?? undefined,
        }));
      },
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
      getAddedClients(): void {
        if (!store.storage()) return;
        const addedClientsMap = new Map();
        const clientsList = store.storage().getSelectedClients() ?? [];
        clientsList.forEach((client: Client) =>
          addedClientsMap.set(client.id, client)
        );
        patchState(store, () => ({
          addedClientsMap,
        }));
      },
      addClient(client: Client): void {
        const map = new Map(store.addedClientsMap());
        map.set(client.id, client);
        const updatedList = [...map.values()];
        patchState(store, () => ({
          addedClientsMap: map,
        }));
        if (!store.storage()) return;
        store.storage().setSelectedClients(updatedList);
      },
      unselectClient(client: Client): void {
        const clientId = client.id;
        if (!store.addedClientsIds().includes(clientId)) return;
        const map = new Map(store.addedClientsMap());
        map.delete(client.id);
        const updatedList = [...map.values()];
        patchState(store, () => ({
          addedClientsMap: map,
        }));
        if (!store.storage()) return;
        store.storage().setSelectedClients(updatedList);
      },
      createClient(client: Partial<Client>): void {
        clientService.create(client).subscribe({
          next: () => this.getClients(),
        });
      },
      editClient(client: Partial<Client>): void {
        if (!store.selectedClient()) return;
        clientService.edit(store.selectedClient()!.id, client).subscribe({
          next: () => this.getClients(),
        });
      },
      deleteSelectedClient(): void {
        const client = store.selectedClient();
        if (!client) return;
        clientService.delete(client.id).subscribe({
          next: () => {
            this.unselectClient(client);
            patchState(store, () => ({
              selectedClient: undefined,
            }));
            this.getClients();
          },
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
      selectClient(selectedClient: Client): void {
        patchState(store, () => ({ selectedClient }));
      },
      isSelected(id: number): boolean {
        return store.addedClientsIds().includes(id);
      },
      logout(): void {
        patchState(store, () => ({ userName: undefined }));
        if (store.storage()) {
          store.storage().resetUserName();
        }
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
        next: () => {
          store.getUserName();
          store.getClients();
          store.getAddedClients();
        },
        error: (err) => console.log(`Error: ${err}`),
      });
    },
  })
);
