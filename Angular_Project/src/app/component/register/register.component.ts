import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {FormGroup,FormBuilder,Validators} from "@angular/forms"
import { Router } from '@angular/router';
import  *as alertify from 'alertifyjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public signupform !: FormGroup;

  constructor(private formBuilder : FormBuilder,private http:HttpClient,private router : Router) { }

  ngOnInit(): void {
    this.signupform = this.formBuilder.group({
      FirstName:['',Validators.required],
      LastName:['',Validators.required],
      Email:['',Validators.required],
      Mobile:['',Validators.required],
      Passcode:['',Validators.required]

    })
  }

  signUp(){

    this.http.post<any>("https://localhost:7106/apiHome/Signup",this.signupform.value)
   .subscribe( res =>{
     alertify.success("Signup Successfull");
     this.signupform.reset();
     this.router.navigate(['home']);
   })
  }
}
