import { Component, ViewChild, OnInit } from '@angular/core';
// import { trigger, state, style, animate, transition, query, group } from '@angular/animations';
import {
    animation, trigger, animateChild, group,
    transition, animate, style, query
} from '@angular/animations';

import { RouterOutlet, Router } from '@angular/router';
import { BasicFormComponent } from './basic-form/basic-form.component';
import { FormGroup } from '@angular/forms';
import { AdvancedFormComponent } from './advanced-form/advanced-form.component';
import { ContactRequestService } from '../../../core/Service/contact-request.service';
import { UserService } from '../../../core/Service/user.service';
import { UserModel } from 'src/app/core/Model/user';

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
export class BaseContactPageComponent implements OnInit {

    public display: boolean = true;
    public basicForm: FormGroup;
    public advancedForm: FormGroup;
    public isDataAvailable: boolean = false;
    public user: UserModel

    constructor(
        private router: Router,
        private contactRequestService: ContactRequestService,
        private userService: UserService
    ) { }

    @ViewChild(BasicFormComponent) basicFormChild?: BasicFormComponent;
    @ViewChild(AdvancedFormComponent) advancedFormChild?: AdvancedFormComponent;

    ngOnInit(): void {
        this.userService.getUser().subscribe(user => {
            if (user instanceof UserModel) {
                this.user = user;
                this.isDataAvailable = true;
            }
        });
    }

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

        this.contactRequestService.createContactRequest(this.user, form).subscribe(contactRequest => {
            console.log(contactRequest);
            
        });
    }

}
