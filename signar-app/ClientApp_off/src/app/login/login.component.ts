import { Component, OnInit, Input } from '@angular/core';

import { ConfigurationService } from '../services/configuration.service';
import { AuthService } from '../services/auth.service';

import { UserLogin } from '../models/user-login.model';
import { LoginResponse } from '../models/login-response.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AuthService]
})
export class LoginComponent implements OnInit {

  loading: boolean;
  userLogin = new UserLogin();

  isUserLoggedIn: boolean;
  shouldShowLoginModal: boolean;

  //appLogoUser = require("../assets/images/svg/user-shape-circle.svg");

  constructor(private configurations: ConfigurationService, private authService: AuthService) {  

  }

  ngOnInit() { }

  login() {

    this.authService.login(this.userLogin.userName, this.userLogin.password, this.userLogin.rememberMe)
        .subscribe(
                    user => {
                      console.log(user);
                      alert("Usuario Autenticado!!!");
                    },
                    error => {
                      alert("Usuario o contraseña incorrectos!");
                    });
  }

}
