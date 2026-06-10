import { Routes } from '@angular/router';
import { Vitrine } from './paginas/vitrine/vitrine';
import { Login } from './paginas/auth/login/login';
import { Cadastro } from './paginas/auth/cadastro/cadastro';

export const routes: Routes = [
    {path: "vitrine", component: Vitrine},
    {path: '', redirectTo: "vitrine", pathMatch: 'full'},
    {path: "login", component: Login},
    {path: "cadastro", component: Cadastro}
];
