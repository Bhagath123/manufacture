import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { HeaderComponent } from './header/header.component';
import { MainComponent } from './main/main.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { FormsModule } from '@angular/forms';     
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { RegisterComponent } from './auth/register/register.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatBadgeModule} from '@angular/material/badge';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {MatButtonModule} from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatChipsModule} from '@angular/material/chips';
import {MatStepperModule} from '@angular/material/stepper';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatDialogModule} from '@angular/material/dialog';
import {MatDividerModule} from '@angular/material/divider';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import {MatNativeDateModule, MatRippleModule} from '@angular/material/core';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSliderModule} from '@angular/material/slider';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatTableModule} from '@angular/material/table';
import {MatTabsModule} from '@angular/material/tabs';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatTreeModule} from '@angular/material/tree';
import {OverlayModule} from '@angular/cdk/overlay';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ProductComponent } from './product/product.component';
import { CategoryComponent } from './category/category.component';
import { PartsComponent } from './parts/parts.component';
import { JwttokenInterceptor } from './jwttoken.interceptor';
import { CoustomerProductsComponent } from './coustomer-products/coustomer-products.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { CustomerPartsComponent } from './customer-parts/customer-parts.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { CustomerOrdersComponent } from './customer-orders/customer-orders.component';
import { AdminOrdersListingComponent } from './admin-orders-listing/admin-orders-listing.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SideNavComponent,
    HeaderComponent,
    MainComponent,
    RegisterComponent,
    ProductComponent,
    CategoryComponent,
    PartsComponent,
    CoustomerProductsComponent,
    CustomerPartsComponent,
    ResetPasswordComponent,
    CartComponent,
    CheckoutComponent,
    CustomerOrdersComponent,
    AdminOrdersListingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    FormsModule,
    HttpClientModule,
    MatTabsModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatCardModule,
    MatPaginatorModule,
    MatDialogModule,
    NgbModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
    OverlayModule,
    CarouselModule, 
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwttokenInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
