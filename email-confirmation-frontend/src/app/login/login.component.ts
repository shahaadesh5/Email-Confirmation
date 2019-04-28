import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { UsermanagementService } from '../usermanagement.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  })

  loginCredentials: any;
  loginData: any;

  constructor(
    private userServ: UsermanagementService,
    private router: Router,
    private toaster: ToastrService
  ) { }

  ngOnInit() {
  }
  loginUser(){
    //getting form values
    this.loginCredentials={
      email: this.loginForm.get('email').value,
      password: this.loginForm.get('password').value,
    }
    //checking these values with the one's in database
    this.userServ.loginUser(this.loginCredentials).subscribe(userData=>{
      console.log(userData);
      this.loginData=userData;
      if(this.loginData === undefined || Object.keys(this.loginData).length === 0){
        this.toaster.error('Invalid Credentials!', 'Error', {
          timeOut: 5500,
          closeButton: true,
          progressBar: true
        });
        console.log("Invalid Credentials!");
      }
      else if(this.loginData[0]["isActive"]===false){
        this.toaster.error('Account not activated!', 'Error', {
          timeOut: 5500,
          closeButton: true,
          progressBar: true
        });
        console.log("Account not activated!");
      }
      else{
        this.router.navigate(['/success']);
      }
    });
  }

}
