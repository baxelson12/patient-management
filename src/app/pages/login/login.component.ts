import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { Subscription } from 'rxjs';
import { Store } from '@ngxs/store';
import { Navigate } from '@ngxs/router-plugin';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  sub: Subscription;
  constructor(
    private as: AuthService,
    private readonly store: Store
  ) {}

  login() {
    this.as
      .login()
      .then(() => this.store.dispatch(new Navigate(['/patients'])));
  }
}
