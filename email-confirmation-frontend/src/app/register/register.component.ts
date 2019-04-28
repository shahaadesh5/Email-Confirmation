import { Component, OnInit } from '@angular/core';
import { UsermanagementService } from '../usermanagement.service';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  createUser = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl('')
  })

  userData: any;

  constructor(
    private userServ: UsermanagementService,
    private toaster: ToastrService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  registerUser(){
    //getting user details from form
    this.userData={
      name: this.createUser.get('name').value,
      email: this.createUser.get('email').value,
      password: this.createUser.get('password').value
    }
    // saving data to database
    this.userServ.signUp(this.userData);
    this.toaster.success('Account created! Check your email for activation', 'Success', {
      timeOut: 5500,
      closeButton: true,
      progressBar: true
    });
    this.router.navigate(['login']);
  }

}
