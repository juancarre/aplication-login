import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BaseContactPageComponent } from './base-contact-page/base-contact-page.component';
import { ContactRoutingModule } from './contact-routing.module';
import { BasicFormComponent } from './base-contact-page/basic-form/basic-form.component';
import { MaterialModule } from 'src/app/core/material/material.module';

@NgModule({
    declarations: [
        BaseContactPageComponent,
        BasicFormComponent
    ],
    imports: [
        CommonModule,
        ContactRoutingModule,
        MaterialModule
    ]
})
export class ContactModule { }
