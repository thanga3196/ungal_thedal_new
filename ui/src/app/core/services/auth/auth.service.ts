import {Injectable} from '@angular/core';
import {HttpService} from "../../../shared/service/http/http.service";
import {UrlConstant} from "../../constants/url.constant";
import {LoginRequest} from "../../models/auth/LoginRequest";
import {RegisterRequest} from "../../models/auth/RegisterRequest";
import {AccessTokenResponse} from "../../models/auth/AccessTokenResponse";

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
    const token = localStorage.getItem("access_token")
    return !!token;
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }
}
