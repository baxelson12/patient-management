import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { firebase } from '@firebase/app';
import { auth } from 'firebase/app';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(public afa: AngularFireAuth) {}

  login() {
    return this.afa.signInWithPopup(new auth.GoogleAuthProvider());
  }
  logout() {
    return this.afa.signOut();
  }
}
