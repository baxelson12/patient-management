import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Patient } from 'src/app/models/patient';
import { Store, Select } from '@ngxs/store';
import * as actions from 'src/app/state/patients/patients.actions';
import { Observable } from 'rxjs';
import { UpdateFormValue } from '@ngxs/form-plugin';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  dw = false;
  searching = false;
  @Select(state => state.patients.queryResult) query$: Observable<
    Patient[]
  >;
  // Form
  searchForm = new FormGroup({
    query: new FormControl('')
  });

  submit() {
    const q = this.searchForm.value.query;
    console.log(q);
    this.store.dispatch(new actions.QueryPatients(q));
  }
  clear() {
    this.searchForm.reset();
    this.searching = false;
    this.store.dispatch(new actions.QueryPatients(''));
  }
  select(patient: Patient) {
    this.searching = false;
    this.router.navigate(['/patients/edit', patient.id]);
  }
  create() {
    this.searching = false;
    this.router.navigate(['/patients/edit']);
  }

  test() {
    console.log('clicked!');
  }
  constructor(
    private readonly store: Store,
    private router: Router
  ) {}
  ngOnInit(): void {}
}
