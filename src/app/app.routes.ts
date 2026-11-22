import { Routes } from '@angular/router';

import { MainLayout } from './layouts/main-layout/main-layout';
import { Home } from './pages/home/home';
import { sobre } from './pages/sobre/sobre';
import { NotFound } from './pages/not-found/not-found';

export const routes: Routes = [
  {
    path: '',
    component: MainLayout,
    children: [{ path: '', component: Home, title: 'Página inicial' }],
  },

  {
    path: '',
    component: MainLayout,
    children: [{ path: 'sobre', component: sobre }],
  },


  { path: '**', component: NotFound }, //notfound, porque eu gosto
  { path: '**', redirectTo: '404' },
];
