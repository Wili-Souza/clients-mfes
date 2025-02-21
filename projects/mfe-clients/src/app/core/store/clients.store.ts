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
};

const initialState: ClientsState = {
  clients: [],
};

const CLIENTS_STATE = new InjectionToken<ClientsState>('UsersState', {
  factory: () => initialState,
});

export const ClientsStore = signalStore(
  withState(() => inject(CLIENTS_STATE)),

  withMethods((store, clientService = inject(ClientService)) => ({
    getClients(): void {
      clientService.getAll(1, 3).subscribe({
        next: (clients) => patchState(store, () => ({ clients })),
      });
    },
  })),

  withHooks({
    onInit(store) {
      store.getClients();
    },
  })
);
