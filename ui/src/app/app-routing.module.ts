import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './core/components/login/login.component';
import {RegisterComponent} from './core/components/register/register.component';
import {ForgotPasswordComponent} from "./core/components/forgot-password/forgot-password.component";

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'home'},
  {path: 'home', loadChildren: () => import('./core/components/home/home.module').then(m => m.HomeModule)},
  {path: 'contact', loadChildren: () => import('./core/components/contact/contact.module').then(m => m.ContactModule)},
  {path: 'about', loadChildren: () => import('./core/components/about/about.module').then(m => m.AboutModule)},
  {path: 'search', loadChildren: () => import('./core/components/search/search.module').then(m => m.SearchModule)},
  {path: 'admin', loadChildren: () => import('./core/components/admin/admin.module').then(m => m.AdminModule)},
  {
    path: 'advertise',
    loadChildren: () => import('./core/components/advertise/advertise.module').then(m => m.AdvertiseModule)
  },
  {path: 'blog', loadChildren: () => import('./core/components/blog/blog.module').then(m => m.BlogModule)},
  {path: 'movie', loadChildren: () => import('./core/components/movie/movie.module').then(m => m.MovieModule)},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'forgot-password', component: ForgotPasswordComponent},
  {path: 'user', loadChildren: () => import('./core/components/user/user.module').then(m => m.UserModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
