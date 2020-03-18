import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as actions from '../../../state/patients/patients.actions';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { UpdateFormValue } from '@ngxs/form-plugin';
import { conformToMask } from 'angular2-text-mask';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {
  patient = new FormGroup({
    name: new FormGroup({
      first: new FormControl('', Validators.required),
      middle: new FormControl(''),
      last: new FormControl('', Validators.required)
    }),
    dob: new FormControl('', Validators.required),
    email: new FormControl(),
    phone: new FormControl('', Validators.required),
    address: new FormGroup({
      line_1: new FormControl('', Validators.required),
      line_2: new FormControl(),
      city: new FormControl('', Validators.required),
      state: new FormControl('', Validators.required),
      zip: new FormControl('', Validators.required)
    }),
    gender: new FormControl('', Validators.required),
    insurance: new FormControl(),
    last_exam: new FormControl('', Validators.required),
    notes: new FormControl(),
    id: new FormControl()
  });

  // Phone input regex
  mask = [
    '(',
    /[1-9]/,
    /\d/,
    /\d/,
    ')',
    ' ',
    /\d/,
    /\d/,
    /\d/,
    '-',
    /\d/,
    /\d/,
    /\d/,
    /\d/
  ];

  constructor(
    private readonly store: Store,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  routemon: Observable<ParamMap> = this.route.paramMap;
  // Watch routes if id exists, populate form
  ngOnInit() {
    this.routemon.subscribe(params => {
      if (params.get('id')) {
        this.store.dispatch(
          new actions.ReadPatient(params.get('id'))
        );
      } else {
        this.store.dispatch(
          new UpdateFormValue({
            path: 'patients.selected',
            value: {}
          })
        );
      }
    });
  }

  delete() {
    this.store.dispatch(
      new actions.DestroyPatient(this.patient.value)
    );
    this.router.navigate(['patients']);
  }

  reset() {
    this.patient.reset();
    this.router.navigate(['patients/edit']);
    this.store.dispatch(
      new UpdateFormValue({ path: 'patients.selected', value: {} })
    );
  }

  validateAllFormControl(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormControl(control);
      }
    });
  }

  submit() {
    if (!this.patient.valid) {
      return;
    }
    const conformedPhoneNumber = conformToMask(
      this.patient.value['phone'],
      this.mask,
      { guide: false }
    );
    this.patient.setValue({
      ...this.patient.value,
      phone: conformedPhoneNumber.conformedValue
    });

    console.log(this.patient.value);
    if (this.patient.value.id) {
      this.store.dispatch(
        new actions.UpdatePatient(this.patient.value)
      );
    } else {
      this.store.dispatch(
        new actions.CreatePatient(this.patient.value)
      );
    }
  }
}
