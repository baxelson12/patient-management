import { Component, OnInit } from '@angular/core';
import * as actions from '../../../state/patients/patients.actions';
import { DateTime } from 'luxon';
import { Store, Select } from '@ngxs/store';
import { Patient } from 'src/app/models/patient';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  @Select(state => state.patients) patientsStore: Observable<any>;

  // Recently added patients
  recents = this.patientsStore.pipe(
    map(store =>
      store.patients.filter(
        (p: Patient) =>
          DateTime.fromISO(p.last_exam) >
          DateTime.local().minus({ days: 50 })
      )
    )
  );

  // Uninsured patients
  uninsured = this.patientsStore.pipe(
    map(store => store.patients.filter((p: Patient) => !p.insurance))
  );

  // Patients missing email
  emails = this.patientsStore.pipe(
    map(store => store.patients.filter((p: Patient) => !p.email))
  );

  // Time since deployment
  uptime = Math.floor(
    DateTime.local()
      .diff(DateTime.fromISO('2020-03-08'), 'days')
      .toObject().days
  );

  // Take first 3 from array
  sample<T>(arr: T[]) {
    return arr.slice(0, 3);
  }

  constructor(private store: Store, private ds: DataService) {}
  ngOnInit(): void {
    this.store.dispatch([
      new actions.AllPatients(),
      new actions.GetAnalytics()
    ]);
  }
}
