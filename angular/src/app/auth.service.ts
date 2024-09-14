import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { Router } from "@angular/router";


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData: any;

  constructor(
    public afAuth: AngularFireAuth,
    public router: Router,
  ) { 
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        // JSON.parse(localStorage.getItem('user'));
      } else {
        localStorage.setItem('user', "null");
        // JSON.parse(localStorage.getItem('user'));
      }
    })
  }
  SignIn(email: any, password: any) {
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }

  SignUp(email: any, password: any) {
    return this.afAuth.createUserWithEmailAndPassword(email, password);
  }
  SignOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      localStorage.removeItem('isProfileCompleted');
      console.log("logout");
    })
  }
}
