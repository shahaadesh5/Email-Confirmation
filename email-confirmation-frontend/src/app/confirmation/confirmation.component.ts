import { Component, OnInit } from '@angular/core';
import { UsermanagementService } from '../usermanagement.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent implements OnInit {

  token:any;
  token_id: string;
  userDetail: any;
  updateUser:any;

  constructor(
    private userServ: UsermanagementService,
    private router: Router,
    private route: ActivatedRoute, 
  ) { }

  ngOnInit() {
    // getting token value from URL parameter
    this.token = this.route.params.subscribe(params => {
      this.token_id = params['token'];
      this.userServ.getUserToken(this.token_id).subscribe(userData=>{
        this.userDetail=userData;
        this.updateUser=this.userDetail;
        this.updateUser={
          "isActive": true
        }
        console.log(this.updateUser);
        //updating the user account isActive field by sending a PUT request
        this.userServ.activateAccount(this.token_id,this.updateUser);
      })
    })
  }

}
