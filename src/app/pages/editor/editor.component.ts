import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import * as actions from '../../state/patients/patients.actions';
import { Patient } from 'src/app/models/patient';
import { Store } from '@ngxs/store';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {
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

  constructor(private readonly store: Store) {}

  ngOnInit(): void {}

  delete(patient: Patient) {
    console.log(patient);
    this.store.dispatch(new actions.DestroyPatient(patient));
  }

  submit() {
    console.warn(this.patient.value);
  }
}
