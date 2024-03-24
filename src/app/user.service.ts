import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
               //http://database-1.ap-southeast-2.elasticbeanstalk.com
  private apiUrl = 'http://localhost:9000/api/users';

  constructor(private http: HttpClient) {}

  getHeader(){
    const username="praveen";
    const password="praveen";
    const credentials = btoa(username + ':' + password);
    return new HttpHeaders({ Authorization: 'Basic ' + credentials });
  }

  registerUser(userData: User){
    console.log(userData);
    const headers=this.getHeader();
    return this.http.post(`${this.apiUrl}/register`, userData,{headers,observe: 'response'});
  }

  getReferralCode(email:any):Observable<string>{
   const headers=this.getHeader();
    return this.http.get<string>(`${this.apiUrl}/referralCode/${email}`,{headers,'responseType':'text' as 'json'});
  }

  getReferralCount(referralCode: string) {
    const data= sessionStorage.getItem('referralCode');
    const headers=this.getHeader();
    return this.http.get<string>(`${this.apiUrl}/referralCount/${data}`,{headers,'responseType':'text' as 'json'});
  }

  getReward(email:any):Observable<string>{
    const headers=this.getHeader();
    return this.http.get<string>(`${this.apiUrl}/rewardPoints/${email}`,{headers,'responseType':'text' as 'json'});
  }

}
