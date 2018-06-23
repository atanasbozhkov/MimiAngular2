import { Injectable } from '@angular/core';
import { first } from 'rxjs/operators';
import * as firebase from 'firebase';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import UserCredential = firebase.auth.UserCredential;

export class User {
  uid: string;
  email = '';
  constructor(auth) {
    this.uid = auth.uid;
    this.email = auth.email;
  }
}

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  currentUser: User;
  constructor(private afAuth: AngularFireAuth,
              private db: AngularFireDatabase ) {
    this.afAuth.authState.subscribe(auth => {
      if (auth) {
        this.currentUser = new User(auth);
      }
    });
  }

  isLoggedIn(): Promise<any> {
    return this.afAuth.authState.pipe(first()).toPromise();
  }

  userLogin(username: string, password: string): Promise<boolean> {
    const provider = new firebase.auth.EmailAuthProvider();
    return new Promise((resolve, reject) => {
      this.afAuth.auth.signInWithEmailAndPassword(username, password)
        .then((userCred: UserCredential) => resolve(true))
        .catch(error => {
          console.log(error);
          reject(error.message);
        });
    });
  }

  logout(): void {
    this.afAuth.auth.signOut();
  }
}
