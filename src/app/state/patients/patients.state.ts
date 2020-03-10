import { State, Action, StateContext } from '@ngxs/store';
import * as actions from './patients.actions';

export class PatientsStateModel {
  public items: string[];
}

@State<PatientsStateModel>({
  name: 'patients',
  defaults: {
    items: []
  }
})
export class PatientsState {}
