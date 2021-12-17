import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import { AuthGuard } from './core/Helper/auth.guard';
import { ActivateAccountComponent } from './shared/activate-account/activate-account.component';
import { HomeComponent } from './shared/home/home.component';
import { LoginComponent } from './shared/login/login.component';
import { ProfileComponent } from './shared/profile/profile.component';
import { RegisterComponent } from './shared/register/register.component';

const routes: Routes = [
  {path: '', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent, pathMatch: 'full'},
  {path: 'register', component: RegisterComponent, pathMatch: 'full'},
  {path: 'activate_user', component: ActivateAccountComponent, pathMatch: 'full'},
  {path: 'profile', component: ProfileComponent, pathMatch: 'full', canActivate: [AuthGuard]},
  {path: '**', redirectTo: '/'},
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
