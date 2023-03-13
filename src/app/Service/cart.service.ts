import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cartItems: Array<any> = [];

  constructor(private http:HttpClient) {
    const storedCart = localStorage.getItem('cart');

    if (storedCart) {
      let existingItem = JSON.parse(storedCart);
      this.cartItems = existingItem.find((cartItem:any) => { cartItem.user_id == localStorage.getItem('user_id')});
    
      if(!this.cartItems){
        this.cartItems = [];
      }
    }
  }

  public addItemToCart(item: any): void {  
    const existingItem = this.cartItems.find(cartItem => {cartItem.id === item.id && cartItem.user_id == localStorage.getItem('user_id')});
    if (existingItem) {
      existingItem.quantity++;
    } else {
      this.cartItems.push({...item, quantity: 1,user_id:localStorage.getItem('user_id')});
    }
    this.updateLocalStorage();
  }

  public getTaxes(): number {
    const taxRate = 0.05; // 10% tax rate for US
    const totalPrice = this.getTotalPrice();
    return totalPrice * taxRate;
  }

  public updateQuantity(itemId: number, newQuantity: number): void {
    const itemToUpdate = this.cartItems.find(cartItem => cartItem.id === itemId && cartItem.user_id == localStorage.getItem('user_id') );
    if (itemToUpdate) {
      itemToUpdate.quantity = newQuantity;
      this.updateLocalStorage();
    }
  }

  public getCartItems(): Array<any> {
    return this.cartItems;
  }

  public removeItemFromCart(itemId: number): void {
    const itemToRemoveIndex = this.cartItems.findIndex(cartItem => cartItem.id === itemId && cartItem.user_id == localStorage.getItem('user_id'));
    if (itemToRemoveIndex !== -1) {
      this.cartItems.splice(itemToRemoveIndex, 1);
      this.updateLocalStorage();
    }
  }

  clearItemsByUserId(): void {
    const items = this.cartItems;
    const filteredItems = items.filter(item => item.user_id !== localStorage.getItem('user_id'));
    localStorage.setItem('cart', JSON.stringify(filteredItems));
    this.updateLocalStorage();
    this.getCartItems();
  }

  public getTotalPrice(): number {
    return this.cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  private updateLocalStorage(): void {
    localStorage.setItem('cart', JSON.stringify(this.cartItems));
  }


  placeOrder(data:any){

    return this.http.post('http://127.0.0.1:8000/api/orders',data);
   }

   ordersBasedOnUser(){

    return this.http.get(`http://127.0.0.1:8000/api/orders?user_id=${localStorage.getItem('user_id')}`);
   }

   orders(){
    return this.http.get(`http://127.0.0.1:8000/api/orders`);
   }
}
