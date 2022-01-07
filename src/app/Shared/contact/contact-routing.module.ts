import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { BaseContactPageComponent } from './base-contact-page/base-contact-page.component';


const routes: Routes = [
    { path: '', component: BaseContactPageComponent },
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