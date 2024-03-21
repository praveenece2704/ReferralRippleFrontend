import { animate, style, transition, trigger } from '@angular/animations';
import { Component, ElementRef, Inject, Renderer2, ViewChild } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { UserService } from '../user.service';
import { DOCUMENT, Location } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  animations: [
    trigger('cardAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.8)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'scale(1)' }))
      ])
    ])
  ]
})
export class DashboardComponent {

  inviteUrl:string='';
  referralCode:string='';
  totalReferrals:string='';
  totalRewards:string='';
  constructor(@Inject(DOCUMENT) private document: Document,private route:ActivatedRoute,private userService:UserService,private router:Router,private location: Location){
    this.userService.getReferralCode(sessionStorage.getItem('email'))
    .subscribe((data):any=>{
       this.referralCode=data;
       sessionStorage.setItem('referralCode',data);
    }
    );
  }
  ngOnInit(){
    this.getInviteUrl();
    };

    
    copyReferralCode(inputElement: HTMLInputElement) {
      inputElement.select();
      document.execCommand('copy');
    }

    getTotalReferrals(){
      this.userService.getReferralCount(this.referralCode)
      .subscribe((data):any=>{
         console.log(data);
         this.totalReferrals=data;
      }
      );
    }

    getRewardPoints(){
      this.userService.getReward(sessionStorage.getItem('email'))
      .subscribe((data):any=>{
         console.log(data);
         this.totalRewards=data;
      }
      );
    }

    getInviteUrl(){
      const referralCode = sessionStorage.getItem('referralCode');
      const baseUrl=this.document.baseURI;
      this.inviteUrl= baseUrl+"register/"+referralCode;
    }
  
}
