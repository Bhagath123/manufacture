import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CartService } from '../Service/cart.service';
export interface OrderedItem {
  name: string;
  price: number;
  quantity: number;
  orderedDate: Date;
  status: string;
}
@Component({
  selector: 'app-customer-orders',
  templateUrl: './customer-orders.component.html',
  styleUrls: ['./customer-orders.component.css']
})
export class CustomerOrdersComponent implements OnInit {
  orderedItems: Array<any> = [];
  displayedColumns: string[] = ['name', 'price', 'quantity',  'orderedDate', 'status'];
  dataSource: MatTableDataSource<OrderedItem> = new MatTableDataSource<OrderedItem>(this.orderedItems);


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private cartService:CartService) { }

  ngOnInit(): void {
    // this.getOrderedItems();
    this.getOrders();
  }

  // getOrderedItems(): void {
  //   const items = JSON.parse(localStorage.getItem('cart') || '[]');
  //   this.orderedItems = items.filter((item: any) => item.quantity > 0).map((item: any) => {
  //     return {
  //       name: item.name,
  //       price: item.price,
  //       quantity: item.quantity,
  //       orderedDate: new Date(),
  //       status: 'Pending'
  //     };
  //   });

  //   this.dataSource = new MatTableDataSource(this.orderedItems);
  //   this.dataSource.paginator = this.paginator;
  //   this.dataSource.sort = this.sort;
  
  // }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  // getTotalPrice(): number {
  //   let total = 0;
  //   for (const item of this.orderedItems) {
  //     total += item.price * item.quantity;
  //   }
  //   return total;
  // }

  // getTaxes(): number {
  //   return this.getTotalPrice() * 0.1;
  // }

  // getGrandTotal(): number {
  //   return this.getTotalPrice() + this.getTaxes();
  // }


getOrders(){
  this.cartService.ordersBasedOnUser().subscribe((data:any)=>{
    for(let i=0;i<data.length;i++){
      for(let j=0;j<data[i]['items'].length;j++){
        data[i]['items'][j]['status'] = data[i]['status'];
      this.orderedItems.push(data[i]['items'][j]);
      }
    }
    this.dataSource = new MatTableDataSource(this.orderedItems);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  })
}

}
