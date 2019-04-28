import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import { LoginComponent } from './login/login.component';
import { SuccessPageComponent } from './success-page/success-page.component';

const routes: Routes = [
  { path: '', component: RegisterComponent },
  { path: 'confirmation/:token', component: ConfirmationComponent },
  { path: 'login', component: LoginComponent },
  { path: 'success', component: SuccessPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
