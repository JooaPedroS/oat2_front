import { Routes } from '@angular/router';
import { userGuard , guestGuard } from './core/user.guard';

import { MainLayout } from './layouts/main-layout/main-layout';
import { Lixo } from './pages/lixo/lixo';
import { Sobre } from './pages/sobre/sobre';
import { Register } from './pages/register/register';
import { Perfil } from './pages/perfil/perfil';
import { NotFound } from './pages/not-found/not-found';
import { Home } from './pages/home/home';
import { Metas } from './pages/metas/metas';

export const routes: Routes = [
  {
    path: '',
    component: MainLayout,
    children: [
      // Públicas (sem guard)
      { path: 'register', component: Register, title: 'Criar conta | EcoApp', canActivate: [guestGuard]},
      { path: 'sobre', component: Sobre, title: 'Sobre | EcoApp' },

      // Só com nome salvo
      {
        path: '',
        component: Home,
        title: 'Página inicial | EcoApp',
        canActivate: [userGuard],
        pathMatch: 'full',
      },
      {
        path: 'lixo',
        component: Lixo,
        title: "Gerenciador de lixo | EcoApp",
        canActivate: [userGuard],
      },
      {
        path: 'metas',
        component: Metas,
        title: "Gerenciador de Metas | EcoApp",
        canActivate: [userGuard],
      },

      { path: 'perfil', component: Perfil, title: 'Meu perfil | EcoApp', canActivate: [userGuard] },

      { path: '**', component: NotFound, title: 'Página não encontrada | EcoApp' },
    ],
  },
];
