
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/core/Service/user.service';
import Validation from 'src/app/core/utils/validation';


@Component({
    selector: "app-register",
    templateUrl: "./register.component.html",
    styleUrls: ["./register.component.css"]
})
export class RegisterComponent {

    registerForm: FormGroup;
    submitted: boolean = false;
    userType?: string;
    loading: boolean = false;


    constructor(
        public userService: UserService,
        private fb: FormBuilder,
        private router: Router
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
            phoneNumber: new FormControl('', [
                Validators.pattern("^[+ 0-9]*$")
            ]),
            companyWeb: new FormControl('', [
                Validators.email
            ]),
            radioTypeUser: new FormControl(''),
        },
            {
                validators: [Validation.confirmPassword('password', 'confirmPassword')]
            }
        )
    }

    get f(): { [key: string]: AbstractControl } {
        return this.registerForm.controls;
    }

    //Aplico el valor seleccionado del radio button a una variable 
    radioChange(userType: string) {
        this.userType = userType;
    }

    register() {
        this.submitted = true;
        this.loading = true;

        if (this.registerForm.invalid) {
            this.loading = false;
            return;
        }
        
        if (this.registerForm.valid) {
            
            let newUser = this.registerForm.value;

            // Elimino los campos que no son obligatorios y vienen vacios
            for (let key in newUser) {
                let value = newUser[key];
                if (!value || value === ''){
                    delete newUser[key];
                }
            }

            // Añado el valor del radio button en caso de que se haya cumplimentado
            if(this.userType !== undefined) {
                Object.assign(newUser, {userType: this.userType});
            }
            
            // Registro al usuario
            this.userService.register(newUser).subscribe({
                next: () => {
                    this.loading = false;
                    this.router.navigate(['/login']);
                },
                error: () => {
                    this.loading = false;
                }
            });
        }
    }
}
