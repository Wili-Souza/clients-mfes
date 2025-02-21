
import {
  initFederation,
  loadRemoteModule,
} from '@angular-architects/native-federation';
import { createCustomElement } from '@angular/elements';
import { createApplication } from '@angular/platform-browser';

initFederation('federation.manifest.json')
  .catch((err) => console.error(err))
  .then((_) => import('./bootstrap'))
  .catch((err) => console.error(err));

  // (async () => {
  //   const app = await createApplication({
  //     providers: [
  //       /* your global providers here */
  //     ],
  //   });

  //   const m = await loadRemoteModule({
  //     remoteEntry: 'http://localhost:4201/remoteEntry.json',
  //     exposedModule: './ButtonComponent',
  //   });
  //   const buttonElement = createCustomElement(m.ButtonComponent, {
  //     injector: app.injector,
  //   });

  //   customElements.define('ds-button', buttonElement);
  // })();
