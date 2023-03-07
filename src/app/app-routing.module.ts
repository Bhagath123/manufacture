import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { CartComponent } from './cart/cart.component';
import { CategoryComponent } from './category/category.component';
import { CoustomerProductsComponent } from './coustomer-products/coustomer-products.component';
import { CustomerPartsComponent } from './customer-parts/customer-parts.component';
import { MainComponent } from './main/main.component';
import { PartsComponent } from './parts/parts.component';
import { ProductComponent } from './product/product.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

const routes: Routes = [

    { path: 'login', component: LoginComponent },
    { path: 'dashboard', component: MainComponent ,canActivate:[AuthGuard]},
    { path: 'register', component: RegisterComponent },
    { path: 'products', component: ProductComponent,canActivate:[AuthGuard] },
    { path: 'category', component: CategoryComponent,canActivate:[AuthGuard] },
    { path: 'parts', component: PartsComponent,canActivate:[AuthGuard] },
    { path: 'customer_products', component: CoustomerProductsComponent },
    { path: 'customer_products/parts/:product_id', component: CustomerPartsComponent },
    { path: 'reset-password/:token', component: ResetPasswordComponent },
    { path: 'cart', component: CartComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
