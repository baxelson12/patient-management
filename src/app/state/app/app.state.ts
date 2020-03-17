import { State, Action, StateContext } from '@ngxs/store';
import * as actions from './app.actions';

import { Notification } from '../../models/notification';
import { Injectable } from '@angular/core';

export class AppStateModel {
  public notifications: Notification[];
}

@State<AppStateModel>({
  name: 'app',
  defaults: {
    notifications: []
  }
})
@Injectable({ providedIn: 'root' })
export class AppState {
  @Action(actions.AddNotification)
  add(
    { patchState, getState }: StateContext<AppStateModel>,
    { payload }: actions.AddNotification
  ) {
    return patchState({
      notifications: [...getState().notifications, payload]
    });
  }

  @Action(actions.RemoveNotification)
  remove(
    { patchState, getState }: StateContext<AppStateModel>,
    { payload }: actions.RemoveNotification
  ) {
    return patchState({
      notifications: getState().notifications.filter(
        p => payload !== p
      )
    });
  }
}
