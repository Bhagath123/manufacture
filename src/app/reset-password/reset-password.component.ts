import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../Service/user.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  constructor(private userService:UserService,private _router: Router,private activeRoute: ActivatedRoute) { }
  onResetPassword(data:any){
    data.value.token = this.activeRoute.snapshot.paramMap.get('token');
    this.userService.resetpassword(data.value).subscribe((login_data:any)=>{
      this._router.navigateByUrl('/login');
    },
    error => {
      console.log(error);
     alert(error.error.message);
    },);
    
  }
  ngOnInit(): void {
  }

}
