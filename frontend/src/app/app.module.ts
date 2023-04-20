/**
 * This is app module which is the whole application's root module.
 * it will initialize the entire app. which contain the all necessary library for the app.
 * When the web initialize the main.ts will invoke this module to access the website.
 */
/**
 * here import the necessary library
 */
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {FormsModule} from "@angular/forms";

/**
 * here is the angular decorator
 * declaration is which components this module have.
 * imports is which other module this module need to access and invoke.
 *
 */
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
