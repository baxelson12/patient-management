import { State, Action, StateContext } from '@ngxs/store';
import { Guid } from 'guid-typescript';
import * as actions from './patients.actions';
import { Patient } from 'src/app/models/patient';
import { DataService } from 'src/app/data.service';
import { tap, debounceTime } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { iif, of } from 'rxjs';
import { UpdateFormValue } from '@ngxs/form-plugin';
import { AddNotification } from '../app/app.actions';
import { Notification } from '../../models/notification';
import { Navigate } from '@ngxs/router-plugin';

export class PatientsStateModel {
  public loading: boolean;
  public patients: Patient[];
  public count: number;
  public uninsured: number;
  public patient: {
    model: Patient;
    dirty: boolean;
    status: string;
    errors: any;
  };
  public queryResult: Patient[];
}

@State<PatientsStateModel>({
  name: 'patients',
  defaults: {
    loading: false,
    patients: [],
    count: 0,
    uninsured: 0,
    patient: {
      model: undefined,
      dirty: false,
      status: '',
      errors: {}
    },
    queryResult: []
  }
})
@Injectable({ providedIn: 'root' })
export class PatientsState {
  constructor(private readonly ds: DataService) {}

  // All
  @Action(actions.AllPatients)
  all({ patchState, dispatch }: StateContext<PatientsStateModel>) {
    patchState({ loading: true });
    return this.ds
      .all$<Patient>('patients')
      .pipe(tap(p => dispatch(new actions.AllPatientsSuccess(p))));
  }
  @Action(actions.AllPatientsSuccess)
  allSuccess(
    { patchState }: StateContext<PatientsStateModel>,
    { payload }: actions.AllPatientsSuccess
  ) {
    return patchState({ loading: false, patients: payload });
  }

  // Create
  @Action(actions.CreatePatient)
  create(
    { dispatch }: StateContext<PatientsStateModel>,
    { payload }: actions.CreatePatient
  ) {
    const notification: Notification = {
      id: Guid.raw(),
      time: 5000,
      title: 'Success!',
      message: 'Patient saved.',
      status: 'Success'
    };
    dispatch(new AddNotification(notification));
    return this.ds.create$<Patient>('patients', payload);
  }

  // Read
  @Action(actions.ReadPatient)
  read(
    { getState, dispatch }: StateContext<PatientsStateModel>,
    { payload }: actions.ReadPatient
  ) {
    return this.ds.read$<Patient>('patients', payload).pipe(
      tap(p => {
        console.log(p);
        dispatch(
          new UpdateFormValue({
            path: 'patients.patient',
            value: p
          })
        );
      })
    );
  }

  // Update
  @Action(actions.UpdatePatient)
  update(
    { dispatch }: StateContext<PatientsStateModel>,
    { payload }: actions.UpdatePatient
  ) {
    const notification: Notification = {
      id: Guid.raw(),
      time: 5000,
      title: 'Success!',
      message: 'Patient updated.',
      status: 'Success'
    };
    dispatch(new AddNotification(notification));
    return this.ds.update$<Patient>('patients', payload);
  }

  // Destroy
  @Action(actions.DestroyPatient)
  destroy(
    { dispatch }: StateContext<PatientsStateModel>,
    { payload }: actions.DestroyPatient
  ) {
    const notification: Notification = {
      id: Guid.raw(),
      time: 5000,
      title: 'Success!',
      message: 'Patient deleted.',
      status: 'Success'
    };
    return this.ds
      .destroy$<Patient>('patients', payload)
      .pipe(
        tap(() =>
          dispatch([
            new Navigate(['/patients']),
            new AddNotification(notification)
          ])
        )
      );
  }

  // Query patients
  @Action(actions.QueryPatients)
  query(
    { patchState, dispatch }: StateContext<PatientsStateModel>,
    { payload }: actions.QueryPatients
  ) {
    patchState({ loading: true });
    return iif(
      () => payload.length > 0,
      this.ds.query$<Patient>('patients', payload),
      of(null)
    ).pipe(
      debounceTime(300),
      tap(p => dispatch(new actions.QueryPatientsSuccess(p)))
    );
  }
  @Action(actions.QueryPatientsSuccess)
  querySuccess(
    { patchState }: StateContext<PatientsStateModel>,
    { payload }: actions.QueryPatientsSuccess
  ) {
    return patchState({ queryResult: payload });
  }

  // Get analytics
  @Action(actions.GetAnalytics)
  analytics({ dispatch }: StateContext<PatientsStateModel>) {
    return this.ds
      .read$<{ id: string; count: number; uninsured: number }>(
        'analytics',
        'patients'
      )
      .pipe(tap(p => dispatch(new actions.GetAnalyticsSuccess(p))));
  }
  @Action(actions.GetAnalyticsSuccess)
  analyticsSuccess(
    { patchState }: StateContext<PatientsStateModel>,
    { payload }: actions.GetAnalyticsSuccess
  ) {
    return patchState({
      count: payload.count,
      uninsured: payload.uninsured
    });
  }
}
