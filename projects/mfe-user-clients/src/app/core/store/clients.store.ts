import { inject, InjectionToken, Injector } from '@angular/core';
import {
  patchState,
  signalStore,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';

import { loadRemoteModule } from '@angular-architects/native-federation';
import { from, Observable, tap } from 'rxjs';
import { Client } from '../../shared/models/client';

type ClientsState = {
  userName: string | undefined;
  clients: Client[];
  storage: any | undefined;
};

const initialState: ClientsState = {
  userName: undefined,
  clients: [],
  storage: undefined,
};

const CLIENTS_STATE = new InjectionToken<ClientsState>('UsersState', {
  factory: () => initialState,
});

export const ClientsStore = signalStore(
  withState(() => inject(CLIENTS_STATE)),

  withMethods((store, injector = inject(Injector)) => ({
    getUserName(): void {
      if (!store.storage()) return;
      const userName = store.storage().getUserName();
      patchState(store, () => ({
        userName: userName ?? undefined,
      }));
    },
    getClients(): void {
      if (!store.storage()) return;
      const clients = store.storage().getSelectedClients() as Client[];
      patchState(store, () => ({
        clients: clients ?? [],
      }));
    },
    removeClient(position: number): void {
      const clients = store.clients();
      clients.splice(position, 1);
      patchState(store, () => ({
        clients,
      }));
      if (!store.storage()) return;
      store.storage().setSelectedClients(clients);
    },
    resetClients(): void {
      if (!store.storage()) return;
      store.storage().resetSelectedClients();
      this.getClients();
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
  })),

  withHooks({
    onInit(store) {
      store.fetchStorageService().subscribe({
        next: () => {
          store.getClients();
          store.getUserName();
        },
        error: (err) => console.log(`Error: ${err}`),
      });
    },
  })
);
