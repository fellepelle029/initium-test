import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./views/clients/clients').then(c => c.Clients)
  }
];
