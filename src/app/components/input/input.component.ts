import { Component, Input, forwardRef } from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR
} from '@angular/forms';
/*
  Usage:
  <app-input placeholder="John"
             type="text"
            formControlName="first_name">
    First Name
  </app-input>
*/

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true
    }
  ]
})
export class InputComponent implements ControlValueAccessor {
  @Input() placeholder: string;
  @Input() type = 'text';
  _val: string;

  get val() {
    return this._val;
  }
  set val(v) {
    this._val = v;
    this.prop(this._val);
  }

  constructor() {}

  writeValue(v: any) {
    if (v !== undefined) {
      this._val = v;
    }
  }
  prop = (_: any) => {};
  registerOnChange(fn) {
    this.prop = fn;
  }
  registerOnTouched() {}
}
