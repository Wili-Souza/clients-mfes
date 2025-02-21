import { inject, InjectionToken } from '@angular/core';
import {
  patchState,
  signalStore,
  withMethods,
  withState,
} from '@ngrx/signals';
import { ClientsStorageService } from '../services/clients-storage.service';

type ClientsState = {
  userName: string | undefined;
};

const initialState: ClientsState = {
  userName: undefined,
};

const CLIENTS_STATE = new InjectionToken<ClientsState>('UsersState', {
  factory: () => initialState,
});

export const ClientsStore = signalStore(
  withState(() => inject(CLIENTS_STATE)),

  withMethods((store, storage = inject(ClientsStorageService)) => ({
    setUserName(name: string): void {
      if (!name) {
        alert('Erro: nome inválido.');
        return;
      }
      storage.setUserName(name);
    },

    resetUserName(): void {
      storage.resetUserName();
    },

    getUserName(): void {
      const userName = storage.getUserName();
      if (userName) patchState(store, () => ({ userName }));
    },
  }))
);
