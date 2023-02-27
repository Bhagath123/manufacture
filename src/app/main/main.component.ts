import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, OnInit ,ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort, Sort} from '@angular/material/sort';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {
  faEdit
} from '@fortawesome/free-solid-svg-icons';
import { NgForm } from '@angular/forms';
import { UserService } from '../Service/user.service';



@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})

export class MainComponent implements OnInit,AfterViewInit  {
 name:any;
 faEdit = faEdit;
 closeResult: string = '';
 public editName:any = "Bhagath";
 status = "Active";
 editUser:any;
USER_DATA: USER[] = [

];
    
 constructor(private modalService: NgbModal,private userService:UserService) {}
  ngOnInit(): void {
    this.getUsers();
  }
  
  displayedColumns: string[] = [ 'name','email', 'role','status' ,'edit'];
  dataSource = new MatTableDataSource<USER>(this.USER_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }



  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  open(content:any,id:number) {

    this.userService.getUserById(id).subscribe((data:any)=>{
      console.log('data',data)
      this.editUser = data.user;
     });

    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
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


  onEditDetails(details:any){
    details.value.id = this.editUser.id;
   this.userService.updateUserById(details.value).subscribe(data=>{
    alert('Updated Successfully');
    this.getUsers();
    // this.getDismissReason("Closed Programatically")
   });
   }

   getUsers(){
    this.userService.getUser().subscribe((data:any)=>{
      console.log(data.users,'data')
      this.dataSource = new MatTableDataSource<USER>(data.users);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
 
   
    })
   }

   onAddUser(data:NgForm){
      data.value.manufacturer_id = 1;
      data.value.is_approved = 1;
      this.userService.register(data.value).subscribe(user_data=>{
      alert('Added Successfully');
      data.resetForm();
      this.getUsers();
    },error => {
      console.log(error.error.errors);
     alert(error.error.errors.password[0]);
    });
    
   }

}

export interface USER {
  name: string;
  email:string;
  role: string;
  is_approved:string;
  id:number
}



