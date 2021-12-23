import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { AboutMeHomeComponent } from './about-me-home/about-me-home.component';
import { EducationComponent } from './education/education.component';
import { WorkExperienceComponent } from './work-experience/work-experience.component';

const routes: Routes = [
    { path: '', component: AboutMeHomeComponent },
    { path: 'education', component: EducationComponent },
    { path: 'experience', component: WorkExperienceComponent },
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
export class AboutMeRoutingModule { }
