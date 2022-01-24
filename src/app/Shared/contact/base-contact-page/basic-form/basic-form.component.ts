import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
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

    @Output() basicFormEmitter: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();
    @Output() saveFormEmitter: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();
    @Input() basicContactFormSaved: any;

    constructor(
        private fb: FormBuilder
    ) {
        this.basicContactForm = this.fb.group({
            email: new FormControl('', [
                Validators.required,
                Validators.minLength(6),
                Validators.email
            ]),
            phone: new FormControl('', [
                Validators.required,
                Validators.minLength(6),
                Validators.pattern("^[+ 0-9]*$")
            ]),
            reason: new FormControl('', [
                Validators.required,
                Validators.minLength(10)
            ]),
            message: new FormControl('', []),
        });
    }

    ngOnInit(): void {
        this.basicContactForm.valueChanges.subscribe(form => {
            this.saveFormEmitter.emit(form);
        })
        
        if (this.basicContactFormSaved !== undefined) {
            Object.keys(this.basicContactForm.controls).forEach(key => {
                this.f[key].setValue(this.basicContactFormSaved[key]);
            })
        }
    }

    get f(): { [key: string]: AbstractControl } {
        return this.basicContactForm.controls;
    }

    getErrorMessage(controlName: string) {
        if (this.f[controlName].hasError('required')) {
            return 'You must enter a value';
        } else if (this.f[controlName].hasError('pattern')) {
            return 'Just numbers, "+" and spaces are allow';
        } else if (this.f[controlName].hasError('minlength')) {
            return 'It should contain some more letter';
        } 
        else if (this.f[controlName].hasError('email')) {
            return 'Not a valid email';
        }
        
        return '';
    }

    sendBasicForm() {
        if (this.basicContactForm.valid) {
            this.basicFormEmitter.emit(this.basicContactForm.value);
        }
    }

}
