import { HttpClient, HttpHandler, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
                    //http://database-1.ap-southeast-2.elasticbeanstalk.com
  private apiUrl = 'http://localhost:9000/api/users';

  constructor(private http: HttpClient) {}

  getHeader(){
    const username="praveen";
    const password="praveen";
    const credentials = btoa(username + ':' + password);
    return new HttpHeaders({ Authorization: 'Basic ' + credentials });
  }

loginUser(loginData: any) {
    console.log(loginData);
    const headers=this.getHeader();
    return this.http.post(`${this.apiUrl}/login`, loginData,{headers, observe:'response'});
  }

  authenticateUser(){
    const headers=this.getHeader();
    return this.http.get(`${this.apiUrl}/`,{headers, responseType:'text' as 'json'});
  }
}
