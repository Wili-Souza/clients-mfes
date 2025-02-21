import { loadRemoteModule } from '@angular-architects/native-federation';
import { inject, InjectionToken, Injector } from '@angular/core';
import {
  patchState,
  signalStore,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';

type ClientsState = {
  userName: string | undefined;
  storage: any | undefined;
};

const initialState: ClientsState = {
  userName: undefined,
  storage: undefined,
};

const CLIENTS_STATE = new InjectionToken<ClientsState>('UsersState', {
  factory: () => initialState,
});

export const ClientsStore = signalStore(
  withState(() => inject(CLIENTS_STATE)),

  withMethods((store, injector = inject(Injector)) => ({
    setUserName(name: string): void {
      if (!name) {
        alert('Erro: nome inválido.');
        return;
      }

      if (!store.storage()) {
        console.error(`Error: Undefined storage service.`);
        return;
      }

      store.storage().setUserName(name);
    },

    fetchStorageService(): void {
      loadRemoteModule({
        remoteName: 'shell',
        exposedModule: './ClientsStorageService',
      })
        .then((m) => {
          const storage = injector.get<any>(m.ClientsStorageService);
          patchState(store, () => ({ storage }));
        })
        .catch((error) => console.log({ error }));
    },
  })),

  withHooks({
    onInit(store) {
      store.fetchStorageService();
    },
  })
);
