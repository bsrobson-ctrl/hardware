import { Routes } from '@angular/router';
import { Vitrine } from './paginas/vitrine/vitrine';
import { Login } from './paginas/auth/login/login';
import { Cadastro } from './paginas/auth/cadastro/cadastro';
import { Inicio } from './paginas/inicio/inicio';
import { Dashboard } from './paginas/admin/dashboard/dashboard';
import { NovoArtigo } from './paginas/admin/novo-artigo/novo-artigo';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: '', component: Inicio },
  { path: 'vitrine', component: Vitrine },
  { path: 'login', component: Login },
  { path: 'cadastro', component: Cadastro },
  {
    path: 'admin',
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full'},
      { path: 'dashboard', component: Dashboard },
      { path: 'novo-artigo', component: NovoArtigo },
      { path: 'editar/:id', component: NovoArtigo },
    ],
  },
];
