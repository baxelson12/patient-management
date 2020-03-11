import { Component } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { PatientsState } from './state/patients/patients.state';
import { FormGroup, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { Patient } from './models/patient';
import * as actions from './state/patients/patients.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @Select(state => state.patients.patients) patients$: Observable<
    Patient[]
  >;

  patient = new FormGroup({
    name: new FormGroup({
      first: new FormControl(),
      middle: new FormControl(),
      last: new FormControl()
    }),
    dob: new FormControl(),
    email: new FormControl(),
    phone: new FormControl(),
    address: new FormGroup({
      line_1: new FormControl(),
      line_2: new FormControl(),
      city: new FormControl(),
      state: new FormControl(),
      zip: new FormControl()
    }),
    gender: new FormControl(),
    insurance: new FormControl(),
    last_exam: new FormControl(),
    notes: new FormControl()
  });

  constructor(private store: Store) {}

  delete(patient: Patient) {
    console.log(patient);
    this.store.dispatch(new actions.DestroyPatient(patient));
  }

  submit() {
    console.warn(this.patient.value);
  }
}
