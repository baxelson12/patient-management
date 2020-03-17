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

  constructor(private store: Store) {}
  ngOnInit(): void {
    this.sub = this.notifications
      .pipe(distinctUntilChanged())
      .subscribe(arr => {
        if (this.index < arr.length) {
          console.log('Scheduling ::', arr[arr.length - 1].id);
          this.schedule(arr[arr.length - 1]);
        }
        this.index = arr.length;
      });
  }

  private schedule(notification: Notification) {
    asyncScheduler.schedule(() => {
      console.log('Timed out ::', notification.id);
      this.store.dispatch(new RemoveNotification(notification));
    }, notification.time);
  }

  close(notification: Notification) {
    console.log('Removing ::', notification.id);
    this.store.dispatch(new RemoveNotification(notification));
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
