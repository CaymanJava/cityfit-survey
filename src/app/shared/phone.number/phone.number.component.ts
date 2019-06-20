import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-phone-number',
  templateUrl: './phone.number.component.html',
  styleUrls: ['./phone.number.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PhoneNumberComponent),
      multi: true
    }
  ]
})
export class PhoneNumberComponent implements ControlValueAccessor {

  @Input() _number = '';

  constructor() {
  }

  propagateChange = (_: any) => {
  }

  writeValue(value: any): void {
    if (value !== undefined) {
      this._number = value;
    }
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {
  }

  get number() {
    return this._number;
  }

  set number(val) {
    this._number = val;
    this.propagateChange(this._number);
  }
}
