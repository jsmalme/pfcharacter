import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function maxNumberValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        if (!control.value) {
            return null;
        }
        const value = +control.value;
        if (!Number.isInteger(value)) {
            return { invalidNumber: true };
        }
        if (value < -100 || value > 100) {
            return { invalidNumer: true };
        }
        return null;
    }
}

export function passwordMatchValidator(): ValidatorFn {
    return (group: AbstractControl): ValidationErrors | null => {
        const confirmPassword = group.get('confirmPassword')?.value;
        const password = group.get('password')?.value;
        if (!confirmPassword || !password) {
            return null;
        }
        if (confirmPassword !== password) {
            return { passwordMatch: true };
        }
        return null;
    }
}