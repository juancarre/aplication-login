import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../Core/Service/authentication.service';
import { UserService } from '../../Core/Service/user.service';
import { UserModel } from '../../Core/Model/user';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

    public userIsLogged: boolean = false;
    public user: any;
    public isDataAvailable: boolean = false;

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService,
        private userService: UserService,
    ) {
        this.authenticationService.getLoggedUser.subscribe(user => {
            if (user instanceof UserModel) {
                this.user = user;
                this.userIsLogged = true;
            }
        });
        
     }

    ngOnInit() {
        this.userService.getUser().subscribe(user => {
            if (user && user instanceof UserModel) {
                this.user = user;
                this.userIsLogged = true;                
            }
            this.isDataAvailable = true;
        });
    }

    logout() {
        this.authenticationService.logout();
        this.router.navigate(['/login']);
    }
}
