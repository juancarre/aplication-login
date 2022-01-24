import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { BaseContactPageComponent } from './base-contact-page/base-contact-page.component';
import { BasicFormComponent } from './base-contact-page/basic-form/basic-form.component';
import { AdvancedFormComponent } from './base-contact-page/advanced-form/advanced-form.component';


const routes: Routes = [
    {
        path: '', component: BaseContactPageComponent,
        children: [
            { path: 'basic-form', component: BasicFormComponent },
            { path: 'advanced-form', component: AdvancedFormComponent }
        ]
    },

];

@NgModule({
    declarations: [],
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class ContactRoutingModule { }