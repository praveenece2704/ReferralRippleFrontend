import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  

  private apiUrl = 'http://localhost:9000/api/users';

  constructor(private http: HttpClient) {}

  registerUser(userData: User){
    console.log(userData);
    return this.http.post(`${this.apiUrl}/register`, userData,{observe: 'response'});
  }

  getReferralCode(email:any):Observable<string>{
    return this.http.get<string>(`${this.apiUrl}/referralCode/${email}`,{'responseType':'text' as 'json'});
  }

  getReferralCount(referralCode: string) {
    const data= sessionStorage.getItem('referralCode');
    console.log(data);
    return this.http.get<string>(`${this.apiUrl}/referralCount/${data}`,{'responseType':'text' as 'json'});
  }

  getReward(email:any):Observable<string>{
    return this.http.get<string>(`${this.apiUrl}/rewardPoints/${email}`,{'responseType':'text' as 'json'});
  }

}
