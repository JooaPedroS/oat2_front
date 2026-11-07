import { Routes } from '@angular/router';

import { MainLayout } from './layouts/main-layout/main-layout';
import { Home } from './pages/home/home';
import { NotFound } from './pages/not-found/not-found';

export const routes: Routes = [

  {
    path: '',
    component: MainLayout,
    children: [
      { path: '', component: Home },
    ]
  },

  { path: '**', component: NotFound },

  { path: '**', redirectTo: '404' }

];