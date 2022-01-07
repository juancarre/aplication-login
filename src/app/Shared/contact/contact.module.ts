import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseContactPageComponent } from './base-contact-page/base-contact-page.component';
import { ContactRoutingModule } from './contact-routing.module';
import { BasicFormComponent } from './basic-form/basic-form.component';
import {MatFormFieldModule} from '@angular/material/form-field'; 



@NgModule({
  declarations: [
    BaseContactPageComponent,
    BasicFormComponent
  ],
  imports: [
    CommonModule,
    ContactRoutingModule,
    MatFormFieldModule
  ]
})
export class ContactModule { }
