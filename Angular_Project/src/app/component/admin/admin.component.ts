import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import {FormBuilder,FormGroup} from '@angular/forms'
import { ProductModel } from './admin.model';
import  *as alertify from 'alertifyjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  public productList : any ;
  formValue !: FormGroup;
  productmodelobj :ProductModel = new ProductModel();

  constructor(private api : ApiService,private formbuilder : FormBuilder,private router :Router) { }

  ngOnInit(): void {

    this.formValue = this.formbuilder.group({
      title :[''],
      price:[''],
      description:[''],
      category:[''],
      image:['']

    })

    this.api.getProduct()
    .subscribe(res=>{
      this.productList = res;

      this.productList.forEach((a:any) => {

        Object.assign(a,{quantity:1,total:a.price});
      });
      console.log(this.productList)
    });
  }

  postProductDetails()
  {
    this.productmodelobj.title = this.formValue.value.title;
    this.productmodelobj.price = this.formValue.value.price;
    this.productmodelobj.description=this.formValue.value.description;
    this.productmodelobj.category=this.formValue.value.category;
    this.productmodelobj.image = this.formValue.value.image;

    this.api.postproduct(this.productmodelobj).subscribe(res=>{
      console.log(res);
      alertify.success("Product Added SuccesFully")
      let ref =document.getElementById('cancel')
      ref?.click();
      this.formValue.reset();
      this.getAllProduct();
    },err=>{
      alertify.error("Something went wrong");
    })
  }

  getAllProduct(){
    this.api.getProduct()
    .subscribe(res=>{
      this.productList = res;

    })
  }

  deleteproduct(item : any){
    this.api.deleteproduct(item.id).subscribe(res =>{
      alertify.success("Product Deleted Successfully")
      this.getAllProduct();
    })
  }

  onEdit(item:any){
    this.productmodelobj.id =item.id;
    this.formValue.controls['title'].setValue(item.title)
    this.formValue.controls['price'].setValue(item.price)
    this.formValue.controls['description'].setValue(item.description)
    this.formValue.controls['category'].setValue(item.category)
    this.formValue.controls['image'].setValue(item.image)
  }
  updateProductDetails( ){
    this.productmodelobj.title = this.formValue.value.title;
    this.productmodelobj.price = this.formValue.value.price;
    this.productmodelobj.description=this.formValue.value.description;
    this.productmodelobj.category=this.formValue.value.category;
    this.productmodelobj.image = this.formValue.value.image;
    this.api.Updateproduct(this.productmodelobj)
    .subscribe(res =>{
      alertify.success("Updated Successfully")
      let ref =document.getElementById('cancel')
      ref?.click();
      this.formValue.reset();
      this.getAllProduct();
    })
  }
  logOut(){
    alertify.success("Thank You Visit Again :)");
    this.router.navigate(['/home']);
    window.localStorage.clear(); //clear all localstorage
    window.localStorage.removeItem("token");
  }
}
