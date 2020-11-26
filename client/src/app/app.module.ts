import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// 2. This is the import you have to add manually
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// need to add a module into the AppModule (this class)
// in order to allow for http requests
//
// adding the Http Module has to be done manually
// (no help from the extensions on this one!)
//
// 1. Add

@NgModule({
  declarations: [
    AppComponent
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
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
