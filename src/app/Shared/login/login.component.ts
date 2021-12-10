import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { AuthenticationService } from '../../Core/Service/authentication.service';
import { first, tap } from 'rxjs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
                user => {
                    if (user?.name !== '') {
                        console.log(user);
                        this.router.navigate([this.returnUrl]);
                    }
                }
            );
	}

}
