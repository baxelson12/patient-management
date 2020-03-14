import { Component, NgZone } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';

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
    private zone: NgZone,
    private auth: AngularFireAuth
  ) {}

  login() {
    this.as.login();
    this.auth.authState.subscribe(() =>
      this.router.navigate(['/patients'])
    );
  }
}
