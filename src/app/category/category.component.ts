import { AfterViewInit, Component, OnInit ,ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {
  faEdit
} from '@fortawesome/free-solid-svg-icons';
import { ProductService } from '../Service/product.service';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  name:any;
  faEdit = faEdit;
  closeResult: string = '';
  public editName:any = "Bhagath";
  status = "Active";
  CATEGORY_DATA: USER[] = [
  
  ];
  catId :number;
     
  constructor(private modalService: NgbModal,private productService:ProductService) {}
   ngOnInit(): void {
     this.getCategory();
   }
   
   displayedColumns: string[] = [ 'name','edit'];
   
   dataSource = new MatTableDataSource < USER > (this.CATEGORY_DATA);

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
     this.productService.getCategoryById(id).subscribe((data:any)=>{
      this.editName = data.data.name;
      this.catId = data.data.id;
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
    details.value.id = this.catId;
   this.productService.updateCategoryById(details.value).subscribe(data=>{
    alert('Updated Successfully');
    this.getCategory();
    // this.getDismissReason("Closed Programatically")
   });
   }
   getCategory(){
    this.productService.getCategory().subscribe((data:any)=>{
      this.dataSource = new MatTableDataSource<USER>(data.data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
 
   
    })
   }

    addCategory(cat_data:NgForm){
    this.productService.addCategory(cat_data.value).subscribe(data=>{
      alert('Added Successfully');
      cat_data.resetForm();
      this.getCategory();
    });
    
   }
 }
 
 export interface USER {
   name: string;
   id:number
 }
 

 


