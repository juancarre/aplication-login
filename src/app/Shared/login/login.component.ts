import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { UserModel } from 'src/app/core/Model/user';
import { AuthenticationService } from 'src/app/core/Service/authentication.service';
import { catchError } from 'rxjs';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

	loading: boolean = false;
	submitted: boolean = false;
	emailInput: string = '';
	passwordInput: string = '';
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
        this.loading = true;
        this.authenticationService.login(this.emailInput, this.passwordInput)
            .subscribe({
                next: (user: UserModel) => {
                    if (user.id !== undefined){
                        this.router.navigate([this.returnUrl]);
                    }
                    this.loading = false;
                },
                error:(e) => {
                    console.log(e);
                    this.loading = false;
                },
            });
	}

}
