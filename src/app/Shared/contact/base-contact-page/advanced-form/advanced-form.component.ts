import { animate, AUTO_STYLE, state, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, Output, ViewChild, OnInit, Input } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { MatRadioChange } from '@angular/material/radio';
import { Moment } from 'moment';
import Validation from 'src/app/core/utils/validation';
import * as moment from 'moment';

const DEFAULT_DURATION = 300;

@Component({
    selector: 'app-contact-advanced-form',
    templateUrl: './advanced-form.component.html',
    styleUrls: ['./advanced-form.component.css'],
    animations: [
        trigger('collapse', [
            state('false', style({ height: AUTO_STYLE, visibility: AUTO_STYLE })),
            state('true', style({ height: '0', visibility: 'hidden' })),
            transition('false => true', animate(DEFAULT_DURATION + 'ms ease-in')),
            transition('true => false', animate(DEFAULT_DURATION + 'ms ease-out'))
        ])
    ]
})
export class AdvancedFormComponent implements OnInit {

    @ViewChild('picker') picker: any;
    @Output() advancedFormEmitter: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();
    @Output() saveFormEmitter: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();
    @Input() advancedContactFormSaved: any;

    advancedContactForm: FormGroup;
    collapse = false;
    minDate: Moment;
    maxDate: Moment

    constructor(
        private fb: FormBuilder
    ) {
        this.advancedContactForm = this.fb.group({
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
            date: new FormControl('', [
                Validation.datePickerValidator()
            ]),
            time: new FormControl('', []),
            requieredSkills: new FormControl('', []),
            joinMyTeam: new FormControl('', []),
            orderProject: new FormControl('', []),
        });

        this.f['joinMyTeam'].setValue(false);
        this.f['orderProject'].setValue(false);
    }

    ngOnInit(): void {
        this.advancedContactForm.valueChanges.subscribe(form => {
            this.saveFormEmitter.emit(form);
        })
        
        if (this.advancedContactFormSaved !== undefined) {
            Object.keys(this.advancedContactForm.controls).forEach(key => {
                this.f[key].setValue(this.advancedContactFormSaved[key]);
            })
        }
    }

    get f(): { [key: string]: AbstractControl } {
        return this.advancedContactForm.controls;
    }

    getErrorMessage(controlName: string) {
        if (this.f[controlName].hasError('required')) {
            return 'You must enter a value';
        } else if (this.f[controlName].hasError('pattern')) {
            return 'Just numbers, "+" and spaces are allow';
        } else if (this.f[controlName].hasError('minlength')) {
            return 'It should contain some more letter';
        } else if (this.f[controlName].hasError('email')) {
            return 'Not a valid email';
        } else if (this.f[controlName].hasError('invalidDate')) {
            return 'La fecha debe ser entre hoy y 14 días';
        } else if (this.f[controlName].hasError('invalidDateWeekend')) {
            return 'No se permiten fines de semana';
        } else if (this.f[controlName].hasError('invalidTime')) {
            return 'La hora debe ser entre las 09:00 y las 15:00';
        }

        return '';
    }

    radioChange(event: MatRadioChange) {
        this.collapse = event.value;
    }

    sendAdvancedForm() {
        if (this.advancedContactForm.valid) {
            this.advancedFormEmitter.emit(this.advancedContactForm.value);
        }
    }

}
