import { Routes } from '@angular/router';
import { Vitrine } from './paginas/vitrine/vitrine';
import { Login } from './paginas/auth/login/login';
import { Cadastro } from './paginas/auth/cadastro/cadastro';
import { Inicio } from './paginas/inicio/inicio';
import { Dashboard } from './paginas/admin/dashboard/dashboard';
import { NovoArtigo } from './paginas/admin/novo-artigo/novo-artigo';
// Novos componentes de vídeo
import { Videos } from './paginas/videos/videos';
import { NovoVideo } from './paginas/admin/novo-video/novo-video';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: '', component: Inicio },

  // Rota pública da vitrine de produtos
  { path: 'vitrine', component: Vitrine },

  // Rota pública da página de vídeos
  { path: 'videos', component: Videos },

  { path: 'login', component: Login },
  { path: 'cadastro', component: Cadastro },

  {
    path: 'admin',
    // authGuard protege todas as rotas admin - redireciona para /login se não autenticado
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: Dashboard },

      // Rotas de produtos
      { path: 'novo-artigo', component: NovoArtigo },
      { path: 'edit/:id', component: NovoArtigo },

      // Rotas de vídeos - o NovoVideo serve tanto para criação quanto para edição
      { path: 'novo-video', component: NovoVideo },
      { path: 'edit-video/:id', component: NovoVideo },
    ],
  },
];
