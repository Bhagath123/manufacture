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
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  images : string[] = [];
  name:any;
  faEdit = faEdit;
  closeResult: string = '';
  public editName:any = "Bhagath";
  status = "Active";
  uploadFiles: string[] = [];
  uploadEditFiles: string[] = [];
  category:any;
  PRODUCT_DATA: PRODUCT[] = [];
  editProduct:any;
  productId:number;
     
  constructor(private modalService: NgbModal,private productService:ProductService) {}
   ngOnInit(): void {
     this.getProducts();
     this.getCategory();
   }
   
   displayedColumns: string[] = [ 'name','sku', 'category','color' ,'size','edit'];
   dataSource = new MatTableDataSource<PRODUCT>(this.PRODUCT_DATA);
 
   @ViewChild(MatPaginator) paginator: MatPaginator;
 
   @ViewChild(MatSort) sort: MatSort;
 
   ngAfterViewInit() {
     this.dataSource.paginator = this.paginator;
     this.dataSource.sort = this.sort;
   }
 
   open(content:any,id:number) {
    this.productService.getProductById(id).subscribe((data:any)=>{
      this.editProduct = data.data;
      this.productId = data.data.id
     });
     this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
       this.closeResult = `Closed with: ${result}`;
     }, (reason) => {
       this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
     });
   } 

   applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
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
 
   onAddProduct(details:any){
    const formData = new FormData();
    for (var i = 0; i < this.uploadFiles.length; i++) {
      formData.append('images[]', this.uploadFiles[i]);
    }
    formData.append('name', details.value.name);
    formData.append('color', details.value.color);
    formData.append('size', details.value.size);
    formData.append('category_id', details.value.category);
    formData.append('manufacturer_id', '1');

    this.productService.addProduct(formData).subscribe(data=>{
      alert('Added Succssfully');
      details.resetForm();
      this.uploadFiles =[];
      this.getProducts();
    });
   }


   onEditProduct(details:NgForm){
    const formData = new FormData();
    for (var i = 0; i < this.uploadEditFiles.length; i++) {
      formData.append('images[]', this.uploadEditFiles[i]);
    }
    formData.append('name', details.value.name);
    formData.append('color', details.value.color);
    formData.append('size', details.value.size);
    formData.append('category_id', details.value.category);
    formData.append('manufacturer_id', '1');

    this.productService.updateProductById(formData,this.productId).subscribe(data=>{
      alert('Updated Succssfully');
      details.resetForm();
      this.uploadEditFiles =[];
      this.getProducts();
    });
   }

   deleteImage(id:number,prod_id:number){
    this.productService.deleteProductImageById(id).subscribe(data=>{
      alert("Deleted Successfully");
      this.productService.getProductById(prod_id).subscribe((data:any)=>{
        this.editProduct = data.data;
       });
    });
   }

  getCategory(){
    this.productService.getCategory().subscribe((data:any)=>{
     this.category = data.data;
    });
   }

  onFileChange(event: any) {
    for (var i = 0; i < event.target.files.length; i++) {
      this.uploadFiles.push(event.target.files[i]);
    }
  }

  onEditFileChange(event: any) {
    for (var i = 0; i < event.target.files.length; i++) {
      this.uploadEditFiles.push(event.target.files[i]);
    }
  }

  getProducts(){
    this.productService.getProducts().subscribe((data:any)=>{
      this.dataSource = new MatTableDataSource<PRODUCT>(data.data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }
 }


 
 export interface PRODUCT {
   name: string;
   sku:string;
   category: string;
   color:string;
   size:string;
   id:number
 }
 
 

