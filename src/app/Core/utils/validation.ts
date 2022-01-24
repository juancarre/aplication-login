import { ValidatorFn, AbstractControl } from '@angular/forms';
import * as moment  from 'moment';
import { Moment } from 'moment';


export default class Validation {
    
    static confirmPassword(passwordInput: string, confirmPasswordInput: string): ValidatorFn {
        return (controls: AbstractControl) => {
            const password = controls.get(passwordInput);
            const confirmPassword = controls.get(confirmPasswordInput);

            if(confirmPassword?.errors && !confirmPassword.errors['matching']) {
                return null;
            }

            if (password?.value !== confirmPassword?.value) {
                controls.get(confirmPasswordInput)?.setErrors({matching: true});
                return {matching: true};
            } else {
                return null;
            }
        }
    }

    static datePickerValidator(): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } | null => {
            let forbidden = false;

            if (control.value) {
                const selectedDate: Moment = moment(control.value).startOf('day');
                const currentDay: Moment = moment().startOf('day');
                const maxDate: Moment = moment().startOf('day').add(15, 'days');

                if (selectedDate < currentDay || selectedDate > maxDate) {
                    forbidden = true;
                }

                if (selectedDate.weekday() === 0 || selectedDate.weekday() === 6) {
                    return { 'invalidDateWeekend': true };
                }
            }
            
            return forbidden ? { 'invalidDate': true } : null;
          };
    }
}
