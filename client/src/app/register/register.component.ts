import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  // make sure EventEmitter is from angular/core.
  // step 1: child to parent comm
  // @Output EventEmitter
  // cancelRegister will be used in the parent's html
  // as (cancelRegister)="..."
  @Output() cancelRegister = new EventEmitter(); 
  model: any = {};

  constructor(private accountService: AccountService) { }

  ngOnInit(): void {
  }

  register() {
    this.accountService.register(this.model).subscribe(response => {
      console.log(response);
      this.cancel();
    }, error => {
      console.log(error);
    })
  }

  cancel() {
    // step 2: child to parent comm
    // emitting the event value 
    this.cancelRegister.emit(false);
  }

}
