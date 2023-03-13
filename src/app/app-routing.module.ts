import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminOrdersListingComponent } from './admin-orders-listing/admin-orders-listing.component';
import { AuthGuard } from './auth/auth.guard';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { CartComponent } from './cart/cart.component';
import { CategoryComponent } from './category/category.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { CoustomerProductsComponent } from './coustomer-products/coustomer-products.component';
import { CustomerOrdersComponent } from './customer-orders/customer-orders.component';
import { CustomerPartsComponent } from './customer-parts/customer-parts.component';
import { MainComponent } from './main/main.component';
import { PartsComponent } from './parts/parts.component';
import { ProductComponent } from './product/product.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { RoleGuardService } from './role-guard.service';

const routes: Routes = [

    { path: 'login', component: LoginComponent },
    { path: 'dashboard', component: MainComponent ,canActivate:[AuthGuard,RoleGuardService]},
    { path: 'register', component: RegisterComponent },
    { path: 'products', component: ProductComponent,canActivate:[AuthGuard,RoleGuardService] },
    { path: 'category', component: CategoryComponent,canActivate:[AuthGuard,RoleGuardService] },
    { path: 'parts', component: PartsComponent,canActivate:[AuthGuard,RoleGuardService] },
    { path: 'order', component: AdminOrdersListingComponent ,canActivate:[AuthGuard,RoleGuardService]},
    { path: 'customer_products', component: CoustomerProductsComponent,canActivate:[AuthGuard] },
    { path: 'customer_products/parts', component: CustomerPartsComponent,canActivate:[AuthGuard] },
    { path: 'reset-password/:token', component: ResetPasswordComponent },
    { path: 'cart', component: CartComponent,canActivate:[AuthGuard] },
    { path: 'checkout', component: CheckoutComponent,canActivate:[AuthGuard] },
    { path: 'customer_ordered_items', component: CustomerOrdersComponent,canActivate:[AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
