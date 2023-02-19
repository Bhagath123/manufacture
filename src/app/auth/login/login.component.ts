import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/Service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


constructor(private userService:UserService,private _router: Router){

}
  ngOnInit() {
  }
  onLoginSubmit(data:any){
    this.userService.login(data.value).subscribe(data=>{
      this._router.navigateByUrl('/dashboard');
    },
    error => {
      console.log(error);
     alert(error.error.message);
    },);

  }

  onSubmit(data:any){
    console.log(data.value);
  }

}