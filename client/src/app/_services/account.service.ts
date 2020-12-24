import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../_models/user';

// @Injectible means that this service can be injected into other 
// services or components in this application.

@Injectable({
  // this is a newer provision. It can be used instead of adding
  // this class into the providers array in app.module.ts
  providedIn: 'root'
})


// An Angular service is a Singleton
export class AccountService {
  baseUrl = 'https://localhost:5001/api/';
  // set aside 1 item of data, as we only need the currently
  // logged in user, or empty, for no login.
  private currentUserSource = new ReplaySubject<User>(1);

  // this allows other components to be able to deal with
  // the user source as an Observable.
  currentUser$ = this.currentUserSource.asObservable();

  // inject HttpClient from angular
  constructor(private http: HttpClient) { }

  login(model: any) {
    return this.http.post(this.baseUrl + 'account/login', model).pipe(
      map((response: User) => {
        const user = response;
        if(user) {
          // this stores the user into local Storage
          localStorage.setItem('user', JSON.stringify(user));
          // this puts the current user into the ReplaySubject
          // for other processes to use (?)
          this.currentUserSource.next(user);
        }
      })
    )
  }

  setCurrentUser(user: User) {
    // this is how we setup the ReplaySubject with an object
    // The .next() method in this case is just going to set
    // the only location that has been set aside (we only need)
    // 1
    // It gets called from the app.component.ts
    this.currentUserSource.next(user);
  }

  logout() {
    // remove user from local Storage (no longer logged it)
    localStorage.removeItem('user');

    // set up the ReplaySubject with null (no user)
    this.currentUserSource.next(null);
  }
}
