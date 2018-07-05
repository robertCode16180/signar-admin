import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { ConfigurationService } from './services/configuration.service';
import { AuthService } from './services/auth.service';

import { LoginComponent } from "./login/login.component";
import { LocalStoreManager } from './services/local-store-manager.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  ngOnInit() { }

  loginControl: LoginComponent;

  constructor(public configurations: ConfigurationService,
              public router: Router,
              private authService: AuthService) {


  }



}
