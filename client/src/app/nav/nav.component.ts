import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../_models/user';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-nav', // this tells you what to embed in another page to show this component
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {}

  constructor(public accountService: AccountService) { }

  ngOnInit(): void {
  }

  login() {
    // accountService.login() returns an Observable
    // Observables are lazy, therefore if we don't subscribe, 
    // it won't do anything!
    this.accountService.login(this.model).subscribe(response => {
      console.log(response);
    }, error => {
      // log error for now
      console.log(error);
    });  
  }

  logout() {
    this.accountService.logout();
  }

}
