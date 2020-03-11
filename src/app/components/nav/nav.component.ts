import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Patient } from 'src/app/models/patient';
import { Store, Select } from '@ngxs/store';
import * as actions from 'src/app/state/patients/patients.actions';
import { Observable } from 'rxjs';

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
  constructor(private readonly store: Store) {}
  ngOnInit(): void {}
}
