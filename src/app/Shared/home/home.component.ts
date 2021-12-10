import { Component, OnInit } from '@angular/core';
import { UserModel } from 'src/app/Core/Model/user';
import { UserService } from '../../Core/Service/user.service';
import { NgModel, FormControl, FormGroup, Form, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthenticationService } from '../../Core/Service/authentication.service';


@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    currentUser: any;

    constructor(
        private userService: UserService,
        private authenticationService: AuthenticationService
        ) { }

    ngOnInit(): void {
        // this.userService.getUser(this.authenticationService.userIdFromToken()).subscribe( user =>{
        //     //this.userService.saveUserOnLocalStorage(user);
        //     this.currentUser = user;
        // });

        this.currentUser = this.userService.getUser(this.authenticationService.userIdFromToken());

    }

}
