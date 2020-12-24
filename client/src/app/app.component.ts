import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from './_models/user';
import { AccountService } from './_services/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

// 3. Use the tools to "Implement interface OnInit"
export class AppComponent 

// 2. We need to add the ability for this component
// to respond to (normally implements OnInit would be 
// right after AppComponent above)
implements OnInit

{
  title = 'client';
  // 5. TypeScript gives us type safety - unless we
  // turn it off with the any keyword! So this means
  // that users can be anything - a string, a date, an
  // array of dates - anything.
  users: any;

  // 1. we add the constructor with injectable parameter
  // (dependency injection of an HttpClient)
  constructor(private http: HttpClient, private accountService: AccountService) {}

  // 4. This is the automatically added method from
  // step 3
  // remove the throw code
  // remove the : void
  
  ngOnInit(){
    this.getUsers();
    this.setCurrentUser();
  }

  setCurrentUser() {
    // get the currently set user from the local storage
    const user: User = JSON.parse(localStorage.getItem('user'));

    // communicate it to the account service.
    this.accountService.setCurrentUser(user);
  }

  getUsers() {
    this.http.get('https://localhost:5001/api/users').subscribe(response => {
      this.users = response;
    }, error => {
      console.log(error);
    })
    
  }
}
