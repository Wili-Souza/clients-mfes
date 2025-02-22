import { inject, InjectionToken } from '@angular/core';
import {
  patchState,
  signalStore,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';

import { ClientService } from '../../data/services/client.service';
import { Client } from '../../shared/models/client';

type ClientsState = {
  clients: Client[];
  pagination: {
    limit: number;
    page: number;
  };
};

const initialState: ClientsState = {
  clients: [],
  pagination: {
    limit: 16,
    page: 1,
  },
};

const CLIENTS_STATE = new InjectionToken<ClientsState>('UsersState', {
  factory: () => initialState,
});

export const ClientsStore = signalStore(
  withState(() => inject(CLIENTS_STATE)),

  withMethods((store, clientService = inject(ClientService)) => ({
    getClients(): void {
      const { page, limit } = store.pagination();
      clientService.getAll(page, limit).subscribe({
        next: (clients) => patchState(store, () => ({ clients })),
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
  })),

  withHooks({
    onInit(store) {
      store.getClients();
    },
  })
);
