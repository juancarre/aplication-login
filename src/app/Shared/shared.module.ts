import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ActivateAccountComponent } from './activate-account/activate-account.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { MatRadioModule } from '@angular/material/radio';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterModule } from '@angular/router';
import { PortfolioItemComponent } from './home/portfolio-item/portfolio-item.component';
import { AboutMeModule } from './about-me/about-me.module';
import { ContactModule } from './contact/contact.module';



@NgModule({
    declarations: [
        LoginComponent,
        RegisterComponent,
        ActivateAccountComponent,
        HomeComponent,
        ProfileComponent,
        PortfolioItemComponent,
    ],
    imports: [
        CommonModule,
        RouterModule,
        MatRadioModule,
        FormsModule,
        ReactiveFormsModule,
        FontAwesomeModule,
        AboutMeModule,
        ContactModule
    ],
    exports: []
})
export class SharedModule { }
