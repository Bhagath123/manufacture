import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/Service/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private userService:UserService,private _router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(data:any){
    data.value.manufacturer_id = 1
    this.userService.register(data.value).subscribe(data=>{
      alert("Registerd Successfully");
      this._router.navigateByUrl('/login');
    },
    error => {
      console.log(error);
     alert(error.error.message);
    },);
  }
  signUp(){
    this._router.navigateByUrl('/login');
  }
}
