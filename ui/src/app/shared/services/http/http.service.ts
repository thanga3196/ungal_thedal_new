import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) {
  }

  getJSON(url: any, params?: any, options?: any) {
    return this.http.get(url);
  }

  get(url: any, params?: any, options?: any) {
    return this.http.get(environment.baseUrl + url + this.queryString(params));
  }

  post(url: any, params?: any, options?: any) {
    return this.http.post(environment.baseUrl + url, params);
  }

  put(url: any, params?: any, options?: any) {
    return this.http.put(environment.baseUrl + url, params);
  }

  delete(url: any, params?: any, options?: any) {
    return this.http.delete(
      environment.baseUrl + url + this.queryString(params)
    );
  }

  private queryString(jsonArray: any) {
    if (!jsonArray || jsonArray.length === 0) {
      return "";
    }
    const str = [];
    for (const p in jsonArray) {
      if (jsonArray.hasOwnProperty(p)) {
        str.push(
          encodeURIComponent(p) + "=" + encodeURIComponent(jsonArray[p])
        );
      }
    }
    if (str.length > 0) {
      return "?" + str.join("&");
    }
    return "";
  }
}
