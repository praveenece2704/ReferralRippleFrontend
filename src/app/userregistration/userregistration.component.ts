import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../user';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-userregistration',
  templateUrl: './userregistration.component.html',
  styleUrls: ['./userregistration.component.css']
})
export class UserregistrationComponent {

  registrationForm: FormGroup;
  user : User ={
    userName:'',
    email:'',
    password:''
  };

  data:any;
  inviteCode:any;
  constructor(private formBuilder: FormBuilder,private userService:UserService,private router: Router,private route:ActivatedRoute) {
    this.registrationForm = this.formBuilder.group({
      userName: ['', Validators.required],
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,}$/)]],
      confirmPassword: ['', Validators.required],
      referredBy: ['']
    }, { validators: this.passwordMatchValidator });
  }

  ngOnInit(){
    this.route.paramMap.subscribe(params => {
     this.inviteCode = params.get('referral'); // Assuming 'id' is a route parameter
  });
}

  onSubmit() {
    if (this.registrationForm.valid) {
      console.log('Registration form submitted:', this.registrationForm.value);
      this.user.userName=this.registrationForm.value.userName;
      this.user.fullName=this.registrationForm.value.fullName;
      this.user.email=this.registrationForm.value.email;
      this.user.password=this.registrationForm.value.password;
      //this.user.referredBy=this.registrationForm.value.referredBy;

      this.user.referredBy = (this.registrationForm.value.referredBy && this.registrationForm.value.referredBy.trim() !== '') ? this.registrationForm.value.referredBy : null;

      console.log(this.user);
      this.userService.registerUser(this.user)
      .subscribe(
        response => {
          console.log('API Response:', response);
          if(response.status===201){
            alert("Registration Success");
            this.data=response.body;
            console.log(this.data.referralCode);
            sessionStorage.setItem("referralCode",this.data.referralCode);
            this.router.navigate(['/login']);
          }else if(response.status===208){
            alert("Email is Already Registered!!!");
            
          }else if(response.status===400){
            alert("Referral code is invalid");
          }
          
          // Handle the response from the backend
        },
        error => {
          if(error.status===208){
            alert("Email is Already Registered!!!");
            
          }else if(error.status===400){
            alert("Referral code is invalid");
          }
          console.error('API Error:', error);
          // Handle error response from the backend
        }
      );

    } else {
      this.registrationForm.markAllAsTouched();
    }
  }

  passwordMatchValidator(formGroup: FormGroup) {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;

    if (password !== confirmPassword) {
      formGroup.get('confirmPassword')?.setErrors({ passwordMismatch: true });
    } else {
      formGroup.get('confirmPassword')?.setErrors(null);
    }

    return null;
  }

}
