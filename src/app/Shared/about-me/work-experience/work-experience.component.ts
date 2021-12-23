import { Component, OnInit } from '@angular/core';
import SwiperCore, { SwiperOptions, Swiper } from 'swiper';

@Component({
    selector: 'app-work-experience',
    templateUrl: './work-experience.component.html',
    styleUrls: ['./work-experience.component.css']
})
export class WorkExperienceComponent implements OnInit {

    config: SwiperOptions = {
        direction: 'vertical',
        loop: false,
        speed: 1600,
        pagination: {
            el: '.swiper-pagination',
            type: 'bullets',
            clickable: true,
            renderBullet: function (index, className) {
                var year = document.querySelectorAll('.swiper-slide')[index].getAttribute('data-year');
                return '<span class="' + className + '">' + year + '</span>';
            }
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
        },
        breakpoints: {
            768: {
                direction: 'vertical',
            }
        }
    };

    constructor() { }

    ngOnInit(): void {
    }

}
