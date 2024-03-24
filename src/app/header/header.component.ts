import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  showLogoutButton:any=true;

  constructor(private router:Router){
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const urlSegments = event.url.split('/');
        const baseRoute = urlSegments[1];
       
        console.log(this.showLogoutButton);
        if(urlSegments[2]==null){
        this.showLogoutButton = !['/login', '/register'].includes(event.url);
        }else{
          this.showLogoutButton =  !baseRoute.startsWith('register');
        }
      }
    });
  }

  logout(){
    sessionStorage.removeItem('email');
    sessionStorage.removeItem('referralCode')
    this.router.navigate(['/login']);
  }
}
