import { Routes } from '@angular/router';
import { userGuard , guestGuard } from './core/user.guard';

import { MainLayout } from './layouts/main-layout/main-layout';
import { Lixo } from './pages/lixo/lixo';
import { Sobre } from './pages/sobre/sobre';
import { Register } from './pages/register/register';
import { Perfil } from './pages/perfil/perfil';
import { NotFound } from './pages/not-found/not-found';
import { Gastos } from './pages/gastos/gastos';
import { Home } from './pages/home/home';

export const routes: Routes = [
  {
    path: '',
    component: MainLayout,
    children: [
      // Públicas (sem guard)
      { path: 'register', component: Register, title: 'Criar conta', canActivate: [guestGuard]},
      { path: 'sobre', component: Sobre, title: 'Sobre' },

      // Só com nome salvo
      {
        path: '',
        component: Home,
        title: 'Página inicial',
        canActivate: [userGuard],
        pathMatch: 'full',
      },
      {
        path: 'lixo',
        component: Lixo,
        title: "Gerenciador de lixo",
        canActivate: [userGuard],
      },
      {
        path: 'gastos',
        component: Gastos,
        title: "Gerenciador de gastos",
        canActivate: [userGuard],
      },

      { path: 'perfil', component: Perfil, title: 'Meu perfil', canActivate: [userGuard] },

      { path: '**', component: NotFound, title: 'Página não encontrada' },
    ],
  },
];
