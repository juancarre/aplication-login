import { Component, OnInit } from '@angular/core';
import { UserModel } from 'src/app/core/Model/user';
import { UserService } from 'src/app/core/Service/user.service';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

    currentUser?: UserModel;
    isDataAvailable: boolean = false;

    constructor(
        private userService: UserService,
    ) { }

    ngOnInit(): void {
        this.userService.getUser().subscribe(user => {
            if (user instanceof UserModel) {
                this.currentUser = user;
                this.isDataAvailable = true;
            }
        });
    }

}
