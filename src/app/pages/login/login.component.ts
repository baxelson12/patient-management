import { Component } from '@angular/core';
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
    private auth: AngularFireAuth
  ) {}

  login() {
    this.as.login();
    // Wait for response, then redirect
    this.auth.authState.subscribe(() =>
      this.router.navigate(['/patients'])
    );
  }
}
