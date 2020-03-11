import { State, Action, StateContext, NgxsOnInit } from '@ngxs/store';
import * as actions from './patients.actions';
import { Patient } from 'src/app/models/patient';
import { DataService } from 'src/app/data.service';
import { tap, debounceTime, switchMap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { iif, of } from 'rxjs';

export class PatientsStateModel {
  public loading: boolean;
  public patients: Patient[];
  public selected: Partial<Patient>;
  public queryResult: Patient[];
}

@State<PatientsStateModel>({
  name: 'patients',
  defaults: {
    loading: false,
    patients: [],
    selected: {},
    queryResult: []
  }
})
@Injectable({ providedIn: 'root' })
export class PatientsState {
  constructor(private readonly ds: DataService) {}
  ngxsOnInit({ dispatch }: StateContext<PatientsStateModel>) {
    // dispatch(new actions.AllPatients());
  }

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
    ctx: StateContext<PatientsStateModel>,
    { payload }: actions.CreatePatient
  ) {
    return this.ds.create$<Patient>('patients', payload);
  }

  // Read
  @Action(actions.ReadPatient)
  read(
    { patchState }: StateContext<PatientsStateModel>,
    { payload }: actions.ReadPatient
  ) {
    return patchState({ selected: payload });
  }

  // Update
  @Action(actions.UpdatePatient)
  update(
    ctx: StateContext<PatientsStateModel>,
    { payload }: actions.UpdatePatient
  ) {
    return this.ds.update$<Patient>('patients', payload);
  }

  // Destroy
  @Action(actions.DestroyPatient)
  destroy(
    ctx: StateContext<PatientsStateModel>,
    { payload }: actions.DestroyPatient
  ) {
    return this.ds.destroy$<Patient>('patients', payload);
  }

  // Query patients
  @Action(actions.QueryPatients)
  query(
    { patchState, dispatch }: StateContext<PatientsStateModel>,
    { payload }: actions.QueryPatients
  ) {
    patchState({ loading: true });
    console.log(payload.length);
    return iif(
      () => payload.length > 3,
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
}
