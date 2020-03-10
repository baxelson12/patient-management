import { State, Action, StateContext } from '@ngxs/store';
import { PatientsAction } from './patients.actions';

export class PatientsStateModel {
  public items: string[];
}

@State<PatientsStateModel>({
  name: 'patients',
  defaults: {
    items: []
  }
})
export class PatientsState {
  @Action(PatientsAction)
  add(ctx: StateContext<PatientsStateModel>, action: PatientsAction) {
    const state = ctx.getState();
    ctx.setState({ items: [ ...state.items, action.payload ] });
  }
}
