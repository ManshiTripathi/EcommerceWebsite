import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './component/about/about.component';
import { AdminComponent } from './component/admin/admin.component';
import { CartComponent } from './component/cart/cart.component';
import { FooterComponent } from './component/footer/footer.component';
import { HomeComponent } from './component/home/home.component';
import { LoginComponent } from './component/login/login.component';
import { InvoiceComponent } from './component/order/invoice/invoice.component';
import { OrderComponent } from './component/order/order.component';
import { ProductsComponent } from './component/products/products.component';
import { RegisterComponent } from './component/register/register.component';
import { ReviewComponent } from './component/review/review.component';
import { AuthGuard } from './shared/auth.guard';
import { RoleGuard } from './shared/role.guard';

const routes: Routes = [
  {path:'', redirectTo:'home',pathMatch:'full'},
  {path:'products', canActivate:[AuthGuard], component: ProductsComponent},
  {path:'cart',component: CartComponent},
  {path:'register', component: RegisterComponent},
  {path:'login', component: LoginComponent},
  {path:'footer', component: FooterComponent},
{
  path:'order', component:OrderComponent,children:[
    {path:'invoice' , component:InvoiceComponent}
  ]
},

  {path:'home', component:HomeComponent},
  {path:'about', component:AboutComponent},
  {path:'review', component:ReviewComponent},
  {path:'admin',component:AdminComponent,canActivate:[RoleGuard]},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
