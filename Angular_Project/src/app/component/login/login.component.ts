import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup,Validators} from '@angular/forms'
import { Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { UserModel } from 'src/app/user.model';
import  *as alertify from 'alertifyjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginForm !:FormGroup;

  public loginobj = new UserModel;

  constructor(private formBuilder :FormBuilder ,private http : HttpClient,private router :Router,private api :ApiService) { }

  ngOnInit(): void {
this.loginForm = this.formBuilder.group({
    Email:['',Validators.required],
    Passcode:['',Validators.required]
});

  }

  login(){
    this.loginobj.Email=this.loginForm.value.Email;
    this.loginobj.Passcode=this.loginForm.value.Passcode;
    this.api.login(this.loginobj)
    .subscribe( res=>{
      alertify.success(res.message);
      this.loginForm.reset();
      localStorage.setItem('token',res.jwtToken);
     localStorage.setItem('userType',res.message);
      console.log(this.loginobj.Email);
      if(res.message === "User Not Found"){
        this.router.navigate(['/home'])

      }
      else if(this.loginobj.Email=="manshitripathi708@gmail.com"){
        this.router.navigate(['/admin'])
      }

      else{
        this.router.navigate(['/products']);
      }
    })
  }

}
