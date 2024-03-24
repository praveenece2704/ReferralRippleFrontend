import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserregistrationComponent } from './userregistration/userregistration.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { authGuard } from './auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: UserregistrationComponent },
  { path: 'register/:referral', component: UserregistrationComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] },
  // Other routes as needed
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
