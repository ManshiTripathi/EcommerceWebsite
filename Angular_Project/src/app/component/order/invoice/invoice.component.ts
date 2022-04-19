import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import  *as alertify from 'alertifyjs';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss']
})
export class InvoiceComponent implements OnInit {

  @Input()  invoiceobj : any = '';

  constructor(private router : Router) { }

  ngOnInit(): void {
  }
  logOut(){
    alertify.success("Thank You Visit Again :)");
    this.router.navigate(['/home']);
    window.localStorage.clear(); //clear all localstorage
    window.localStorage.removeItem("token");
  }
}


