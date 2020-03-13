import { Component, OnInit, Input } from '@angular/core';
import {
  trigger,
  transition,
  style,
  animate
} from '@angular/animations';
import { asyncScheduler } from 'rxjs';
import { Notification } from '../../models/notification';
import { Store } from '@ngxs/store';
import { RemoveNotification } from 'src/app/state/app/app.actions';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
  animations: [
    trigger('inOutAnimation', [
      transition(':enter', [
        style({ transform: 'translate(0, 8rem)', opacity: 0 }),
        animate(
          '1s ease-out',
          style({ transform: 'translate(0)', opacity: 1 })
        )
      ]),
      transition(':leave', [
        style({ transform: 'translate(0)', opacity: 1 }),
        animate(
          '1s ease-out',
          style({ transform: 'translate(0, 8rem)', opacity: 0 })
        )
      ])
    ])
  ]
})
export class NotificationComponent implements OnInit {
  @Input() notification: Notification;
  open = true;
  constructor(private store: Store) {}

  ngOnInit(): void {
    asyncScheduler.schedule(() => {
      this.open = false;
      this.store.dispatch(new RemoveNotification(this.notification));
    }, this.notification.time);
  }
}
