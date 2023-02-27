import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { CategoryComponent } from './category/category.component';
import { MainComponent } from './main/main.component';
import { PartsComponent } from './parts/parts.component';
import { ProductComponent } from './product/product.component';

const routes: Routes = [
  
    { path: 'login', component: LoginComponent },
    { path: 'dashboard', component: MainComponent ,canActivate:[AuthGuard]},
    { path: 'register', component: RegisterComponent },
    { path: 'products', component: ProductComponent,canActivate:[AuthGuard] },
    { path: 'category', component: CategoryComponent,canActivate:[AuthGuard] },
    { path: 'parts', component: PartsComponent,canActivate:[AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
