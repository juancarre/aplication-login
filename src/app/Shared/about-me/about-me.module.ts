import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EducationComponent } from './education/education.component';
import { WorkExperienceComponent } from './work-experience/work-experience.component';
import { AboutMeHomeComponent } from './about-me-home/about-me-home.component';
import { AboutMeRoutingModule } from './about-me-routing.module';

import { NgxUsefulSwiperModule } from 'ngx-useful-swiper';


@NgModule({
  declarations: [
    EducationComponent,
    WorkExperienceComponent,
    AboutMeHomeComponent
  ],
  imports: [
    CommonModule,
    AboutMeRoutingModule,
    NgxUsefulSwiperModule,
  ],
  exports: [
      EducationComponent,
      WorkExperienceComponent
  ]
})
export class AboutMeModule { }
