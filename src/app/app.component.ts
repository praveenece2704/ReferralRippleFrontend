import { Component } from '@angular/core';
import { LoginService } from './login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'referralrippleapp';


  constructor(private loginservice:LoginService){
    let response =this.loginservice.authenticateUser();
    response.subscribe((data)=>{
      console.log(data);
    })
  }
}
