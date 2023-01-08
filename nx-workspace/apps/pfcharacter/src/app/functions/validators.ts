import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';

export function maxNumberValidator(): ValidatorFn {
    return (control:AbstractControl) : ValidationErrors | null => {
        if (!control.value) {
            return null;
        }
        const value = +control.value;
        if(!Number.isInteger(value)){
            return {invalidNumber: true};
        }
        if(value < -100 || value > 100){
            return {invalidNumer: true};
        }
        return null;
    }
}
