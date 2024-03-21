import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../login.service';
import { User } from '../user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  user: User={
    email:'',
    password:''
  }
  data:any;

  constructor(private formBuilder: FormBuilder,private loginService:LoginService,private router: Router) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      // Process login logic here, such as sending a request to your backend API
      console.log('Login form submitted:', this.loginForm.value);
      this.user.email=this.loginForm.value.email;
      this.user.password=this.loginForm.value.password;
      this.loginService.loginUser(this.user)
      .subscribe((response=>{
        console.log(response.status);
        if(response.status===200){
          this.data=response.body;
          sessionStorage.setItem('email',this.data.email);
          alert("Login success");
          this.router.navigate(['/dashboard']);
        }
      })
      );

    } else {
      // Handle invalid form data
      console.log('Invalid form data.');
    }
  }
}
