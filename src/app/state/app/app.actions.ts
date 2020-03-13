import { Notification } from '../../models/notification';

export class AddNotification {
  static readonly type = '[App] Add notification';
  constructor(public payload: Notification) {}
}

export class RemoveNotification {
  static readonly type = '[App] Remove notification';
  constructor(public payload: Notification) {}
}
