import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMap, map, take, share, first } from 'rxjs/operators';
import { auth } from 'firebase/app';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import { DbService } from './db.service';
import { AppLoaderService } from './app-loader.service';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<any>;
  isAdmin$: Observable<boolean>;
  isExpert$: Observable<boolean>;
  constructor(
    private afAuth: AngularFireAuth,
    private db: DbService,
    private router: Router,
    private loader: AppLoaderService
  ) {
    if (this.getRedirect()) {
      this.handleRedirect();
    }
    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => (user ? db.doc$(`users/${user.uid}`) : of(null)))
    );
    this.isAdmin$ = this.user$.pipe(
      switchMap(user =>
        user ? of(this.checkAuthorization(user, ['admin'])) : of(null)
      )
    );
    this.isExpert$ = this.user$.pipe(
      switchMap(user =>
        user ? of(this.checkAuthorization(user, ['expert'])) : of(null)
      )
    );
  }

  isLoggedIn() {
    return this.afAuth.authState.pipe(first()).toPromise();
  }

  isLoggedIn$() {
    return this.afAuth.authState;
  }

  private removeLocaUser() {
    localStorage.removeItem('user');
  }

  async logOut() {
    await this.afAuth.auth.signOut();

  }

  isInRole(user, role): boolean {
    return this.checkAuthorization(user, [role]);
  }

  // determines if user has matching role
  private checkAuthorization(user: any, allowedRoles: string[]): boolean {
    if (!user) {
      return false;
    }
    for (const role of allowedRoles) {
      if (user.roles[role]) {
        return true;
      }
    }
    return false;
  }

   updateUserData({ uid,id=uid, email, displayName , firstName='', lastName='', photoURL, isAnonymous, myValidatedNews =[], myNews = [] , createdAt= firebase.firestore.Timestamp.now() ,gender='',dateOfBirth='',country=''}) {
    const path = `users/${uid}`;
    this.db
      .exists$(path)
      .pipe(
        map(user => {
          if (user.exists) {
            user.displayName = displayName;
            user.firstName = firstName;
            user.lastName = lastName;
            user.email = email;
            user.photoURL = photoURL;
            user.id = uid;
            user.myValidatedNews = myValidatedNews;
            user.myNews = myNews;
            user.createdAt = createdAt;
            user.gender = gender;
            user.dateOfBirth = dateOfBirth;
            user.country=country
            this.db.updateAt(path, { ...user });
          } else {
            const roles = {
              online: true,
              admin: false,
              expert: false
            };


            const data = {
              id,
              uid,
              email,
              displayName,
              firstName,
              lastName,
              photoURL,
              isAnonymous,
              roles,
              createdAt,
              gender,
              dateOfBirth,
              country
            };


            this.db.updateAt(path, data);
          }
        }),
        first()
      )
      .subscribe();
  }

  async googleLogin() {
    try {
      const provider = new auth.GoogleAuthProvider();
      return await this.oAuthLogin(provider);
    } catch (error) {
      return error;
    }
  }


  async twitterLogin() {
    try {
      const provider = new auth.TwitterAuthProvider();
      return await this.oAuthLogin(provider);
    } catch (error) {
      return error;
    }
  }


  async credentialsLogin(email, password) {
    try {
      // const provider = new auth.TwitterAuthProvider();
      return await this.afAuth.auth.signInWithEmailAndPassword(email, password);
    } catch (error) {
      return error;
    }
  }

  async facebookLogin() {
    try {
      const provider = new auth.FacebookAuthProvider();
      provider.addScope('email');
      return await this.oAuthLogin(provider);
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  private async oAuthLogin(provider) {
    let credential;

    try {
      credential = await this.afAuth.auth.signInWithPopup(provider);
      return  this.updateUserData(credential.user);
    } catch (error) {
      console.log(error);
    }
  }

  setRedirect(val) {
    localStorage.setItem('authRedirect', val);
  }

  getRedirect() {
    return localStorage.getItem('authRedirect');
  }

  private async handleRedirect() {
    if (this.getRedirect()) {
      try {
        this.loader.open();
        const credential = await this.afAuth.auth.getRedirectResult();
        this.setRedirect(false);
        this.updateUserData(credential.user);
        this.loader.close();

      } catch (error) {
        this.loader.close();
      }
    }
  }

  user() {
    return this.user$
      .pipe(
        take(1),
        map(u => u)
      )
      .toPromise();
  }
}
