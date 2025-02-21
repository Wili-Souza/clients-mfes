import { loadRemoteModule } from '@angular-architects/native-federation';
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      loadRemoteModule('mfeLogin', './Component')
        .then((m) => m.AppComponent)
        .catch((err) => console.log(err)),
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'login'
  }
];
