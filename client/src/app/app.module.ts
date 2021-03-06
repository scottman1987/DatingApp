import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// 2. This is the import you have to add manually
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavComponent } from './nav/nav.component';
import { FormsModule } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';

// need to add a module into the AppModule (this class)
// in order to allow for http requests
//
// adding the Http Module has to be done manually
// (no help from the extensions on this one!)
//
// 1. Add

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    // this is what gets added manually
    // you'll have to also add an import
    // at the top of this file to allow
    // HttpClientModule to work
    HttpClientModule,
    
    AppRoutingModule,
    
    BrowserAnimationsModule,
    FormsModule,
    BsDropdownModule.forRoot()
  
    
  ],

  // this is the providers array referred to in the comment in 
  // account.service.ts
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
