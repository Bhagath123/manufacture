import { Component, OnInit } from '@angular/core';
import { CartService } from '../Service/cart.service';

@Component({
  selector: 'app-admin-orders-listing',
  templateUrl: './admin-orders-listing.component.html',
  styleUrls: ['./admin-orders-listing.component.css']
})
export class AdminOrdersListingComponent implements OnInit {
  orders:any[] = [
  ]
  constructor(private cartService:CartService) { }

  ngOnInit(): void {
    this.getOrders();
  }

  getOrders(){
    this.cartService.orders().subscribe((data:any)=>{
       this.orders = data;
  console.log(data,'datat');

    });
  }





}
