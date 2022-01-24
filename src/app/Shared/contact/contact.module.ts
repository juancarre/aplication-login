import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BaseContactPageComponent } from './base-contact-page/base-contact-page.component';
import { ContactRoutingModule } from './contact-routing.module';
import { BasicFormComponent } from './base-contact-page/basic-form/basic-form.component';
import { MaterialModule } from 'src/app/core/material/material.module';
import { AdvancedFormComponent } from './base-contact-page/advanced-form/advanced-form.component';

@NgModule({
    declarations: [
        BaseContactPageComponent,
        BasicFormComponent,
        AdvancedFormComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        ContactRoutingModule,
        MaterialModule
    ]
})
export class ContactModule { }
