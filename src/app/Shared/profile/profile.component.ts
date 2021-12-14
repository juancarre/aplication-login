import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/Core/Service/user.service';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

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
