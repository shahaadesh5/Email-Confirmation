import { Injectable } from '@angular/core';
import { HttpClient , HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsermanagementService {

  constructor(private http: HttpClient) { 
    
  }
  //register route with a POST request
  signUp(userDetails:any){
      this.http.post('http://localhost:3000/user/signup_user',userDetails)
      .subscribe(response=>{
        console.log("User created. But is inactive!");
      });
  }
  // getting user details from token string
  getUserToken(token:string){
    return this.http.get("http://localhost:3000/user/userToken/"+token);
}
// sending login form credentials for checking user credentials
loginUser(loginCredentials:any){
  console.log(loginCredentials);
  return this.http.post("http://localhost:3000/user/login/",loginCredentials);
}
// route to activate inactive accounts
activateAccount(token:string,userData:any){
  console.log("Token",token);
  console.log(userData);
  this.http.put('http://localhost:3000/user/activate/'+token,userData).subscribe(response=>{
    console.log(response);
  });
}
}
