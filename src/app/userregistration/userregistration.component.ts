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
      password: ['', [Validators.required, Validators.minLength(6)]],
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
      this.user.referredBy=this.registrationForm.value.referredBy;
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
          }
          
          // Handle the response from the backend
        },
        error => {
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
