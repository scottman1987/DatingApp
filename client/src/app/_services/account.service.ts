import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

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

  // inject HttpClient from angular
  constructor(private http: HttpClient) { }

  login(model: any) {
    return this.http.post(this.baseUrl + 'account/login', model);
  }
}
