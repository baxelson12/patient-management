import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  trigger,
  transition,
  style,
  animate,
  stagger,
  query
} from '@angular/animations';
import { asyncScheduler, Observable, Subscription } from 'rxjs';
import { Notification } from '../../models/notification';
import { Store, Select } from '@ngxs/store';
import { RemoveNotification } from 'src/app/state/app/app.actions';
import { distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
  animations: [
    trigger('inOutAnimation', [
      transition('* => *', [
        query(
          ':leave',
          [
            stagger(300, [
              animate(
                '300ms ease-out',
                style({ transform: 'translate(8rem, 0)', opacity: 0 })
              )
            ])
          ],
          { optional: true }
        ),
        query(
          ':enter',
          [
            style({ transform: 'translate(0, 1rem)', opacity: 0 }),
            stagger(300, [
              animate(
                '300ms ease-in',
                style({ transform: 'translate(0)', opacity: 1 })
              )
            ])
          ],
          { optional: true }
        )
      ])
    ])
  ]
})
export class NotificationComponent implements OnInit, OnDestroy {
  @Select(state => state.app.notifications) notifications: Observable<
    Notification[]
  >;
  index: number;
  sub: Subscription;

  // Subscribe to state to receive notifications
  constructor(private store: Store) {}
  ngOnInit(): void {
    this.sub = this.notifications
      .pipe(distinctUntilChanged())
      .subscribe(arr => {
        if (this.index < arr.length) {
          this.schedule(arr[arr.length - 1]);
        }
        this.index = arr.length;
      });
  }

  // Set a timer to remove notification from display
  private schedule(notification: Notification) {
    asyncScheduler.schedule(() => {
      this.store.dispatch(new RemoveNotification(notification));
    }, notification.time);
  }

  // Close notification
  close(notification: Notification) {
    this.store.dispatch(new RemoveNotification(notification));
  }

  // Cleanup
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
