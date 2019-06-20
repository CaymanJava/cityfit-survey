import { AbstractControl, ValidatorFn } from '@angular/forms';

export class PhoneValidator {
  static valid(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      if (control.value.length < 7) {
        return {'invalidPhone': {value: control.value}};
      }
      return null;
    };
  }
}
