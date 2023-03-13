import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from '../Service/cart.service';
import { ProductService } from '../Service/product.service';

@Component({
  selector: 'app-customer-parts',
  templateUrl: './customer-parts.component.html',
  styleUrls: ['./customer-parts.component.css']
})
export class CustomerPartsComponent implements OnInit {
  products:any=[];
  products_list:any=[];
  category:any;
  editParts:any;
  partId:any;

  options = [
    { label: 'Option 1', value: 'option1' },
    { label: 'Option 2', value: 'option2' },
    { label: 'Option 3', value: 'option3' }
  ];
  
  selectedOptions = [];
  
  onSelectionChange(event:any) {
    console.log(this.selectedOptions);
    // this.selected_products = this.selectedOptions
    this.getParts();
  }

  constructor(private cartService: CartService,private productService:ProductService,private modalService: NgbModal) { }

  ngOnInit(): void {
    this.getProducts();

    this.getCategory();
    this.getParts();
  }

  getProducts(){
    this.productService.getProducts().subscribe((data:any)=>{
      this.products_list = data.data;
      console.log(this.products_list,'this.products');
    });
  }
  getCategory(){
    this.productService.getCategory().subscribe((data:any)=>{
     this.category = data.data;
    });
  }

  getParts(){
    this.productService.getPartsByProduct(this.selectedOptions).subscribe((data:any)=>{
      // console.log(data,'dataaaa');
      this.products = data.parts;
      console.log(this.products,'this.products');
    });
  }



  customOptions: OwlOptions = {
    loop: true,
    autoplay: true,
    center: true,
    dots: true,
    autoHeight: true,
    autoWidth: true,
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 1,
      },
      1000: {
        items: 1,
      }
    }
  }
  
  open(content:any,id:number) {

    this.productService.getPartsById(id).subscribe((data:any)=>{
      console.log(data,'dataaaaa');
      this.editParts = data.data;
      this.partId = id;
     });

     this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result:any) => {
       this.closeResult = `Closed with: ${result}`;
     }, (reason:any) => {
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


  addToCart(item:any){
    console.log(item,"Cart Items");
    this.cartService.addItemToCart(item);
    alert('Item Added to cart');
  }











   
  name:any;
  faEdit = faEdit;
  closeResult: string = '';
  public editName:any = "Bhagath";
  status = "Active";
  CATEGORY_DATA: USER[] = [
  
  ];
  catId :number;
     
 
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
 
  //  open(content:any,id:number) {
  //    this.productService.getCategoryById(id).subscribe((data:any)=>{
  //     this.editName = data.data.name;
  //     this.catId = data.data.id;
  //    });
  //    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result: any) => {
  //      this.closeResult = `Closed with: ${result}`;
  //    }, (reason: any) => {
  //      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  //    });
  //  } 
 
  //  private getDismissReason(reason: any): string {
  //    if (reason === ModalDismissReasons.ESC) {
  //      return 'by pressing ESC';
  //    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
  //      return 'by clicking on a backdrop';
  //    } else {
  //      return  `with: ${reason}`;
  //    }
  //  }
 
   onEditDetails(details:any){
    details.value.id = this.catId;
   this.productService.updateCategoryById(details.value).subscribe(data=>{
    alert('Updated Successfully');
    this.getCategory();
    // this.getDismissReason("Closed Programatically")
   });
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

