// register.component.ts
import { Component, OnInit } from '@angular/core';
import { UserService } from "../../Core/Service/user.service";
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import Validation from '../utils/validation';

@Component({
    selector: "app-register",
    templateUrl: "./register.component.html",
    styleUrls: ["./register.component.css"]
})
export class RegisterComponent implements OnInit {

    // name: string = '';
    // email: string = '';
    // password: string = '';
    // confirmPassword: string = '';
    // company_name?: string;
    // phone?: number;
    // company_web?: string;

    registerForm: FormGroup;
    submitted: boolean = false;


    constructor(
        public userService: UserService,
        private fb: FormBuilder,
    ) {
        this.registerForm = this.fb.group({
            name: new FormControl('', [
                Validators.required,
                Validators.minLength(6)
            ]),
            email: new FormControl('', [
                Validators.required,
                Validators.email
            ]),
            password: new FormControl('', [
                Validators.required,
                Validators.minLength(6)
            ]),
            confirmPassword: new FormControl('', [
                Validators.required,
            ]),
            companyName: new FormControl(''),
            phone: new FormControl('', [
                Validators.pattern("^[+ 0-9]*$")
            ]),
            companyWeb: new FormControl('', [
                Validators.email
            ]),
        },
            {
                validators: [Validation.confirmPassword('password', 'confirmPassword')]
            }
        )
    }

    ngOnInit(): void {

    }

    get f(): { [key: string]: AbstractControl } {
        return this.registerForm.controls;
    }

    register() {

        this.submitted = true;

        if (this.registerForm.invalid) {
            console.log(JSON.stringify(this.registerForm.value, null, 10));
            return;
        }

        console.log(JSON.stringify(this.registerForm.value, null, 10));
        

        // const userForRegister = { name: this.name, email: this.email, password: this.password };

        // this.userService.register(userForRegister).subscribe(data => {
        //     console.log(data);
        // });

        // console.log(this.name);
        // console.log(this.email);
        // console.log(this.password);
    }
}
