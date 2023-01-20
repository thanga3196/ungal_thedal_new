import {Injectable} from '@angular/core';
import {HttpService} from "src/app/shared/services/http/http.service";
import {UrlConstant} from "src/app/core/constants/url.constant";
import {LoginRequest} from "src/app/core/models/auth/LoginRequest";
import {RegisterRequest} from "src/app/core/models/auth/RegisterRequest";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpService: HttpService) {
  }

  login(loginRequest: LoginRequest) {
    return this.httpService.post(UrlConstant.login, loginRequest);
  }

  register(registerRequest: RegisterRequest) {
    return this.httpService.post(UrlConstant.register, registerRequest);
  }

  logout() {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token")
    localStorage.removeItem("user_details")
  }

  public isLoggedIn() {
    return !!localStorage.getItem("access_token")
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }

  getUserDetails() {
    let json: any;
    json = JSON.parse(localStorage.getItem("user_details") || '{}')
    return json
  }
}
