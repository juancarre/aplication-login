import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-portfolio-item',
    templateUrl: './portfolio-item.component.html',
    styleUrls: ['./portfolio-item.component.css']
})
export class PortfolioItemComponent {

    @Input() src?: string;
    @Input() title?: string;
    @Input() subtitle?: string;
    @Input() modalLink?: string;

    constructor() { }


}
