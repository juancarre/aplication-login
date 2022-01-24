import { Component, ViewChild } from '@angular/core';
// import { trigger, state, style, animate, transition, query, group } from '@angular/animations';
import {
    animation, trigger, animateChild, group,
    transition, animate, style, query
} from '@angular/animations';

import { RouterOutlet, Router } from '@angular/router';
import { BasicFormComponent } from './basic-form/basic-form.component';
import { FormGroup } from '@angular/forms';
import { AdvancedFormComponent } from './advanced-form/advanced-form.component';

@Component({
    selector: 'app-base-contact-page',
    templateUrl: './base-contact-page.component.html',
    styleUrls: ['./base-contact-page.component.css'],
    animations: [
        trigger('inOutBasicForm', [
            transition(':enter', [
                style({ opacity: 0, transform: 'translateX(-100%)' }),
                animate(
                  '1500ms ease-in-out',
                  style({ opacity: 1, transform: 'translateX(0)' })
                ),
              ])
        ]),
        trigger('inOutAdvancedForm', [
            transition(':enter', [
                style({ opacity: 0, transform: 'translateX(-100%)' }),
                animate(
                  '1500ms ease-in-out',
                  style({ opacity: 1, transform: 'translateX(0)' })
                ),
              ])
        ])
    ],
})
export class BaseContactPageComponent {

    public display: boolean = true;
    public basicForm: FormGroup;
    public advancedForm: FormGroup;

    constructor(
        private router: Router
    ) { }

    @ViewChild(BasicFormComponent) basicFormChild?: BasicFormComponent;
    @ViewChild(AdvancedFormComponent) advancedFormChild?: AdvancedFormComponent;

    prepareRoute(outlet: RouterOutlet) {
        return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
    }

    changeForm(display: boolean) {
        this.display = display;
    }

    isFormValid(): boolean {
        let disabled: boolean = true;

        if (this.display) {
            if (this.basicForm !== undefined && this.basicForm.valid) {
                disabled = false;
            }
        } else {
            if (this.advancedForm !== undefined && this.advancedForm.valid) {
                disabled = false;
            }
        }

        return disabled;
    }

    saveForm(form: FormGroup, formName: string) {
        if (formName === 'basic') {
            this.basicForm = form;
        } else {
            this.advancedForm = form;
        }
    }

    sendAction() {
        if(this.display) {
            this.basicFormChild?.sendBasicForm();
        } else {
            this.advancedFormChild?.sendAdvancedForm();
        }
    }

    sendForm(form: FormGroup) {
        console.log(form);
        
    }


}
