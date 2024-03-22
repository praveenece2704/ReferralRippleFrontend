import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = 'http://database-1.ap-southeast-2.elasticbeanstalk.com/api/users';

  constructor(private http: HttpClient) {}

loginUser(loginData: any) {
    console.log(loginData);
    return this.http.post(`${this.apiUrl}/login`, loginData,{observe:'response'});
  }
}
