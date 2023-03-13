import { Component, OnInit } from '@angular/core';
import { CartService } from '../Service/cart.service';
import {faRemove,faShoppingCart} from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: Array<any> = [];
  total: number = 0;
  taxes: number = 0;
  faRemove = faRemove;
  faShoppingCart = faShoppingCart;
  constructor(private cartService: CartService,private _router: Router) { 
    this.cartItems = this.cartService.getCartItems();
    this.total = this.cartService.getTotalPrice();
    this.taxes = this.cartService.getTaxes();
  }

  ngOnInit(): void {
    this.cartItems = this.cartService.getCartItems();
    this.total = this.cartService.getTotalPrice();
    this.taxes = this.cartService.getTaxes();

  }

  updateQuantity(itemId: number, newQuantity: number): void {
    this.cartService.updateQuantity(itemId, newQuantity);
    this.cartItems = this.cartService.getCartItems();
    this.total = this.cartService.getTotalPrice();
    this.taxes = this.cartService.getTaxes();
  }
  removeItem(itemId: number): void {
    this.cartService.removeItemFromCart(itemId);
    this.cartItems = this.cartService.getCartItems();
    this.total = this.cartService.getTotalPrice();
    this.taxes = this.cartService.getTaxes();
  }

  isCartEmpty(): boolean {
    return this.cartItems.length === 0;
  }

  orderItems(){
    let amount:any = this.total+this.taxes;
    let addedItems =[];
    for(let i=0;i<this.cartItems.length;i++){
      addedItems.push({
        "part_id":this.cartItems[i]['id'],
        "quantity":this.cartItems[i]['quantity'],
        "item_price":this.cartItems[i]['price']
    })
    }
    let data = {
      "user_id":localStorage.getItem('user_id'),
      "total": parseFloat(amount).toFixed(2),
      "shipping_charges":0,
      "discount":0,
      "tax":this.taxes,
      "sub_total":this.total,
      "status":"Pending",
      "items":addedItems
  }
    this.cartService.placeOrder(data).subscribe(data=>{
      console.log('order_placed',data);
      this.cartService.clearItemsByUserId();
      alert('Order Placed Successfully');
      
      this.cartItems = this.cartService.getCartItems();
      this.total = this.cartService.getTotalPrice();
      this.taxes = this.cartService.getTaxes();
      window.location.reload();
      this._router.navigateByUrl('/customer_ordered_items');


    });
  }


}
