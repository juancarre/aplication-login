import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { DataSharingService } from './Service/data-sharing.service';
import { UserAdapter } from './Model/user';
import { JwtInterceptor } from './Helper/jwt.interceptor';
import { ErrorInterceptor } from './Helper/error.interceptor';

import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';

import localeEs from '@angular/common/locales/es';
import {registerLocaleData} from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterModule } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';


registerLocaleData(localeEs, 'es');



@NgModule({
    declarations: [
        HeaderComponent,
        FooterComponent
    ],
    imports: [
        CommonModule,
        HttpClientModule,
        RouterModule,
        BrowserAnimationsModule,
        MatSnackBarModule,
        FontAwesomeModule,
        MatMenuModule
    ],
    providers: [
        DataSharingService,
        UserAdapter,
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
        { provide: LOCALE_ID, useValue: 'es' }
    ],
    exports: [
        HeaderComponent,
        FooterComponent,
    ]
})
export class CoreModule { }
