import { ValidatorFn, AbstractControl } from '@angular/forms';


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
}