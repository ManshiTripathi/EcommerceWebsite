import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup } from '@angular/forms';

import { Router } from '@angular/router';
import { OrderModels } from 'src/app/order.model';
import { ApiService } from 'src/app/service/api.service';
import { CartService } from 'src/app/service/cart.service';
import  *as alertify from 'alertifyjs';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})

export class OrderComponent implements OnInit {
  public invoiceitem  : any = '';
  public showorder : boolean = true;
  public showinvoice : boolean = false;
  public total : number =0;
  public cartProduct : any [] = [];
  public allProductName : string ="";
  public cartitems :any;
  public orderForm! : FormGroup;
  constructor(private api : ApiService,private http:HttpClient,private formbuilder : FormBuilder,private cart : CartService,private router : Router) { }
  Orderobj : OrderModels = new OrderModels();
  ngOnInit(): void {

    this.total = this.cart.getTotalPrice();
    this.cartProduct =this.cart.cartItemList;
    this.cart.getProducts().subscribe(res =>{

      this.cartitems = res.length;
    });

    this.orderForm = this.formbuilder.group({

          fullname:[''],
          Email:[''],
          Mobile:[''],
          Address:[''],

    });


  }

  orderPlace(){
this.Orderobj.FullName=this.orderForm.value.fullname;
this.Orderobj.Email=this.orderForm.value.Email;
this.Orderobj.PhoneNumber=this.orderForm.value.Mobile;
this.Orderobj.UserAddress=this.orderForm.value.Address;
this.Orderobj.ProductName=this.cart.getitle();
this.Orderobj.Price= this.cart.getTotalPrice();
this.Orderobj.Quantity=this.cartitems;
this.invoiceitem=this.Orderobj;
this.api.postOrder(this.Orderobj).subscribe( res =>
  {
    alertify.success("Order Placed Successfully");
    this.showorder=false;
    this.router.navigate(['/order/invoice'])
    this.showinvoice =true;

    this.orderForm.reset();
  })
  }

}
