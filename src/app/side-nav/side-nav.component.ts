import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  faUser,
  
  faShop,
 
  faShoppingBag,
  faChartBar,
  faSliders,
  faSignOut,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {
  faUser = faUser;
  faShop = faShop;
  faShoppingBag = faShoppingBag;

  faChartBar = faChartBar;
  faChain = faSliders;
  faLogout = faSignOut;

  constructor(private _router: Router) { }

  ngOnInit(): void {
  }
  signOut(){
    localStorage.removeItem('id_token');
    this._router.navigateByUrl('/login');
  }
  user(){
    this._router.navigateByUrl('/dashboard');
  }

  product(){
    this._router.navigateByUrl('/products');
  }
  category(){
    this._router.navigateByUrl('/category');
  }
  parts(){
    this._router.navigateByUrl('/parts');
  }
  products(){
    this._router.navigateByUrl('/customer_products');
  }
}
