import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { UserModel } from 'src/app/core/Model/user';
import { AuthenticationService } from 'src/app/core/Service/authentication.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

	loading: boolean = false;
	submitted: boolean = false;
	email: string = '';
	password: string = '';
	returnUrl: string = '/'
	error: string = '';

	constructor(
		private route: ActivatedRoute,
		private authenticationService: AuthenticationService,
		public router: Router
	) { }

	ngOnInit(): void {
		this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
	}

	login() {
        this.authenticationService.login(this.email, this.password)
            .subscribe(
                (user: UserModel) => {
                    if (user.id !== undefined){
                        this.router.navigate([this.returnUrl]);
                    }
                }
            );
	}

}
