import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/Service/user.service';
import { Router } from '@angular/router';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  closeResult: string;


constructor(private userService:UserService,private _router: Router,private modalService: NgbModal){

}
  ngOnInit() {
 
  }
  onLoginSubmit(data:any){
    
   
    this.userService.login(data.value).subscribe((login_data:any)=>{
      console.log(data,'datraaa');
      localStorage.setItem('id_token',login_data.access_token);
      this._router.navigateByUrl('/dashboard');
    },
    error => {
      console.log(error);
     alert(error.error.message);
    },);

  }


  open(content:any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result: any) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason: any) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  } 

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
  onEditDetails(data:any){
    this.userService.forgetpassword(data.value).subscribe((login_data:any)=>{
      alert('Reset Link Sent To Email Id');
      this._router.navigateByUrl('/login');
    },
    error => {
     alert(error.error.message);
    },);
  }

  signIn(){
    this._router.navigateByUrl('/register');
  }
}
