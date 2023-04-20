/**
 * This is app component file which contain the component method.
 * It can simply call the method from service to connect to backend or cloud.
 */

import { Component } from '@angular/core'; // invoking Component class from the angular core library to make the component class working.
import { FireService } from "./fire.service"; // invoking the FireService class from fire.service file to use the FireService Object.

/**
 * This is the decorator with '@' will connect the component class to html and css,
 * "selector" is point the which tag from uplevel html can use this component
 * "templateUrl" will point which html file connect this component
 * "styleUrls" will point which css files connnect this component
  */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

/**
 * The main part of component can contain the component variables and constructor and methods.
 */
export class AppComponent {
  title = 'frontend';
  sendThisMessage: any;
  /**
   * component constructor using dependency injection to use all the method from service.
   * in here because the service use singleton pattern for Service, so in stack there only one instance.
   * therefore we have to use dependency injection to invoke this instance.
   *
   * we don't actually call any method right here from the service. we just inject multiple service to make the angular
   * parameter form html file can use those injected service's method.
   *
   * @param fireService
   */
  constructor(public fireService: FireService) {
  }


}
