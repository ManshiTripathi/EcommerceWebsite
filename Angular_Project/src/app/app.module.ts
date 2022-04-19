import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './component/header/header.component';
import { CartComponent } from './component/cart/cart.component';
import { ProductsComponent } from './component/products/products.component';
import { HttpClientModule } from '@angular/common/http';
import { FilterPipe } from './shared/filter.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './component/register/register.component';
import { LoginComponent } from './component/login/login.component';
import { FooterComponent } from './component/footer/footer.component';
import { HomeComponent } from './component/home/home.component';
import { OrderComponent } from './component/order/order.component';
import { BillComponent } from './component/bill/bill.component';
import { AboutComponent } from './component/about/about.component';
import { ReviewComponent } from './component/review/review.component';
import { AdminComponent } from './component/admin/admin.component';
import { BillgenerateComponent } from './order/billgenerate/billgenerate.component';
import { InvoiceComponent } from './component/order/invoice/invoice.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CartComponent,
    ProductsComponent,
    FilterPipe,
    RegisterComponent,
    LoginComponent,
    FooterComponent,
    HomeComponent,
    OrderComponent,
    BillComponent,
    AboutComponent,
    ReviewComponent,
    AdminComponent,
    BillgenerateComponent,
    InvoiceComponent,
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
