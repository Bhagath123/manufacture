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
  selector: 'app-parts',
  templateUrl: './parts.component.html',
  styleUrls: ['./parts.component.css']
})
export class PartsComponent implements OnInit {


  name:any;
  faEdit = faEdit;
  closeResult: string = '';
  public editName:any = "";
  status = "";
  uploadFiles: string[] = [];
  uploadEditFiles: string[] = [];
  products:any;
  PARTS_DATA: PARTS[] = [];
  editParts:any;
  partId:number;
     
  constructor(private modalService: NgbModal,private productService:ProductService) {}
   ngOnInit(): void {
    this.getProducts();
    this.getParts();
   }
   
   displayedColumns: string[] = [ 'name','sku', 'product','color' ,'size','edit'];
   dataSource = new MatTableDataSource<PARTS>(this.PARTS_DATA);
 
   @ViewChild(MatPaginator) paginator: MatPaginator;
 
   @ViewChild(MatSort) sort: MatSort;
 
   ngAfterViewInit() {
     this.dataSource.paginator = this.paginator;
     this.dataSource.sort = this.sort;
   }
 
   open(content:any,id:number) {
    this.productService.getPartsById(id).subscribe((data:any)=>{
      this.editParts = data.data;
      this.partId = id;
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

  onAddParts(details:NgForm){
    const formData = new FormData();
    for (var i = 0; i < this.uploadFiles.length; i++) {
      formData.append('images[]', this.uploadFiles[i]);
    }
    formData.append('name', details.value.name);
   
    formData.append('color', details.value.color);
    formData.append('size', details.value.size);
    formData.append('product_id', details.value.product_id);
    formData.append('specifications', details.value.specifications);
    formData.append('description', details.value.description);
    formData.append('style', details.value.style);
    formData.append('product_id', details.value.product_id);
    formData.append('price', details.value.price);
    formData.append('weight', details.value.weight);
    formData.append('manufacturer_id', '1');

    this.productService.addParts(formData).subscribe(data=>{
      alert('Added Succssfully');
      details.resetForm();
      this.uploadFiles = [];
      this.getParts();
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
      this.products = data.data;
    });
  }
 

  getParts(){
    this.productService.getParts().subscribe((data:any)=>{
      console.log(data);
      this.dataSource = new MatTableDataSource<PARTS>(data.parts);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
    });
  }


  deleteImage(id:number,prod_id:number){
    this.productService.deletePartImageById(id).subscribe(data=>{
      alert("Deleted Successfully");
      this.productService.getPartsById(prod_id).subscribe((data:any)=>{
        this.editParts = data.data;
       });
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
 
   onEditParts(details:any){
    const formData = new FormData();
    for (var i = 0; i < this.uploadEditFiles.length; i++) {
      formData.append('images[]', this.uploadEditFiles[i]);
    }
    formData.append('name', details.value.name);
    formData.append('color', details.value.color);
    formData.append('size', details.value.size);
    formData.append('style', details.value.style);
    formData.append('product_id', details.value.product_id);
    formData.append('specifications', details.value.specifications);
    formData.append('description', details.value.description);
    formData.append('price', details.value.price);
    formData.append('weight', details.value.weight);
    formData.append('manufacturer_id', '1');

    this.productService.updatePartsById(formData,this.partId).subscribe(data=>{
      alert('Updated Succssfully');
      details.resetForm();
      this.uploadEditFiles =[];
      this.getParts();
    });
   }
 }
 
 export interface PARTS {
   name: string;
   sku:string;
   product: string;
   color:string;
   size:string;
   id:number
 }

 