import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Patient } from 'src/app/models/patient';
import { Store, Select } from '@ngxs/store';
import * as actions from 'src/app/state/patients/patients.actions';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {
  dw = false;
  searching = false;
  @Select(state => state.patients.queryResult) query$: Observable<
    Patient[]
  >;

  // Form
  searchForm = new FormGroup({
    query: new FormControl('')
  });

  // Send query
  submit() {
    const q = this.searchForm.value.query;
    this.store.dispatch(new actions.QueryPatients(q));
  }

  // Clear searchbar
  clear() {
    this.searchForm.reset();
    this.searching = false;
    this.store.dispatch(new actions.QueryPatients(''));
  }

  // Navigate to selected patient
  select(patient: Patient) {
    this.searching = false;
    this.router.navigate(['/patients/edit', patient.id]);
  }

  // Add new
  create() {
    this.searching = false;
    this.router.navigate(['/patients/edit']);
  }

  // Logout
  signOut() {
    this.as.logout();
    this.auth.authState.subscribe(x => {
      this.router.navigate(['/login']);
    });
  }

  constructor(
    private readonly store: Store,
    private readonly as: AuthService,
    private router: Router,
    public auth: AngularFireAuth
  ) {}
}
