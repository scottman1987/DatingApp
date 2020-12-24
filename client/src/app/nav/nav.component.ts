import { Component, OnInit } from '@angular/core';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-nav', // this tells you what to embed in another page to show this component
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {}
  loggedIn: boolean;

  constructor(private accountService: AccountService) { }

  ngOnInit(): void {
    this.getCurrentUser();
  }

  login() {
    // accountService.login() returns an Observable
    // Observables are lazy, therefore if we don't subscribe, 
    // it won't do anything!
    this.accountService.login(this.model).subscribe(response => {
      console.log(response);
      // setting this bit is a temporary measure - better handling to come
      this.loggedIn = true;
    }, error => {
      // log error for now
      console.log(error);
    });  
  }

  logout() {
    this.accountService.logout();
    this.loggedIn = false;
  }

  // this is going to get the user from the ReplaySubject ultimately
  getCurrentUser() {
    this.accountService.currentUser$.subscribe(user => {
      this.loggedIn = !!user;
    }, error => {
      console.log(error);
    })
  }
}
