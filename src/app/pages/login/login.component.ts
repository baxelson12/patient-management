import { Component, NgZone } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { Subscription } from 'rxjs';
import { Store } from '@ngxs/store';
import { Navigate } from '@ngxs/router-plugin';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  sub: Subscription;
  constructor(
    private as: AuthService,
    private router: Router,
    private zone: NgZone
  ) {}

  login() {
    this.as
      .login()
      .then(() =>
        this.zone.run(() => this.router.navigate(['/patients']))
      );
  }
}
