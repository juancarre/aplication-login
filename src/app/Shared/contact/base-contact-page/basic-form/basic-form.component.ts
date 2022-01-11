import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-contact-basic-form',
    templateUrl: './basic-form.component.html',
    styleUrls: ['./basic-form.component.css']
})
export class BasicFormComponent implements OnInit {

    basicContactForm: FormGroup;
    colorControl = new FormControl('primary');
    fontSizeControl = new FormControl(16, Validators.min(10));

    constructor(
        private fb: FormBuilder
    ) {
        this.basicContactForm = this.fb.group({
            color: this.colorControl,
            fontSize: this.fontSizeControl,
            email: new FormControl('', [
                Validators.required,
                Validators.minLength(6)
            ]),
            phone: new FormControl('', [
                Validators.required,
                Validators.minLength(6)
            ]),
            motivo: new FormControl('', [
                Validators.required,
                Validators.minLength(6)
            ]),
            message: new FormControl('', [
                Validators.required,
                Validators.minLength(6)
            ]),
        });
    }

    ngOnInit(): void {
    }

    get f(): { [key: string]: AbstractControl } {
        return this.basicContactForm.controls;
    }

    getErrorMessage() {
        if (this.f['email'].hasError('required')) {
            return 'You must enter a value';
        }

        return this.f['email'].hasError('email') ? 'Not a valid email' : '';
    }

}
