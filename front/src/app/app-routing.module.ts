import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from "./guards/auth.guard";
import {AdminGuard} from "./guards/admin.guard";

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./views/login-page/login-page.module').then(m => m.LoginPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./views/home/home.module').then(m => m.HomeModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'users',
    loadChildren: () => import('./views/users/users.module').then(m => m.UsersModule),
    // canActivate: [AuthGuard]
  },
  {
    path: 'reactive',
    loadChildren: () => import('./reactive-state/reactive-state.module').then(m => m.ReactiveStateModule)
  },
  {
    path: 'user/create',
    loadChildren: () => import('./views/create/create.module').then(m => m.CreateModule),
    canActivate: [AuthGuard, AdminGuard]
  },
  {
    path: 'user/:id/edit',
    loadChildren: () => import('./views/edit/edit.module').then(m => m.EditModule),
    canActivate: [AuthGuard]
  },
  {

    path: '', redirectTo: 'login', pathMatch: 'full'
  },
  {
    path: '**', redirectTo: 'login', pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
