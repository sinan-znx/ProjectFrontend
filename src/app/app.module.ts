import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { CategoryComponent } from './components/category/category.component';
import { CartComponent } from './components/cart/cart.component';
import { ManageComponent } from './components/manage/manage.component';
import { OrdersComponent } from './components/orders/orders.component';
import { NewProductComponent } from './components/managePages/new-product/new-product.component';
import { EditProductComponent } from './components/managePages/edit-product/edit-product.component';
import { EditCarouselComponent } from './components/managePages/edit-carousel/edit-carousel.component';
import { NewCarouselComponent } from './components/managePages/new-carousel/new-carousel.component';
import { EditCategoryComponent } from './components/managePages/edit-category/edit-category.component';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { ProductPageComponent } from './components/product-page/product-page.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { SuccessfullComponent } from './components/successfull/successfull.component';
import { FailedPayComponent } from './components/failed-pay/failed-pay.component';
import { ProductsListComponent } from './components/products-list/products-list.component';
import { ManageOrdersComponent } from './components/manage-orders/manage-orders.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    CategoryComponent,
    CartComponent,
    ManageComponent,
    OrdersComponent,
    NewProductComponent,
    EditProductComponent,
    EditCarouselComponent,
    NewCarouselComponent,
    EditCategoryComponent,
    ProductPageComponent,
    CheckoutComponent,
    SuccessfullComponent,
    FailedPayComponent,
    ProductsListComponent,
    ManageOrdersComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi: true,
  }],
  bootstrap: [AppComponent],
})
export class AppModule {}
