import { Component, OnInit } from '@angular/core';
import { UserService } from '../../Core/Service/user.service';


@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    currentUser: any;
    isDataAvailable: boolean = false;

    constructor(
        private userService: UserService,
        ) { }

    ngOnInit(): void {
        this.userService.getUser().subscribe(user => {
            this.currentUser = user;
            this.isDataAvailable = true;
        });
    }

}
