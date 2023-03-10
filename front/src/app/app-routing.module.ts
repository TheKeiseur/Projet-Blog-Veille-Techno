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
    path: 'favored-posts',
    loadChildren: () => import('./views/favored-posts/favored-posts.module').then(m => m.FavoredPostsModule),
    canActivate: [AuthGuard]
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
    path: 'post/create',
    loadChildren: () => import('./views/create/create.module').then(m => m.CreateModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'post/:id/edit',
    loadChildren: () => import('./views/edit/edit.module').then(m => m.EditModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'post/:id',
    loadChildren: () => import('./views/post-detail/post-detail.module').then(m => m.PostDetailModule),
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
export class AppRoutingModule {
}
