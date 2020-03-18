import { Component } from '@angular/core';
import { Store } from '@ngxs/store';
import { UpdateForm, UpdateFormValue } from '@ngxs/form-plugin';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  constructor(private store: Store) {}

  formReset() {
    this.store.dispatch(
      new UpdateFormValue({ value: {}, path: 'patients.patient' })
    );
  }
}
