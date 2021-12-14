import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {LoginComponent} from "./Shared/login/login.component";
import {RegisterComponent} from "./Shared/register/register.component";
import {ActivateAccountComponent} from "./Shared/activate-account/activate-account.component";
import { AuthGuard } from './Core/Helper/auth.guard';
import { HomeComponent } from './Shared/home/home.component';
import { ProfileComponent } from './Shared/profile/profile.component';

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
