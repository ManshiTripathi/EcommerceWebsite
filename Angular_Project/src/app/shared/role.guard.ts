import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import *as alertify from 'alertifyjs';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(private router : Router){}
  canActivate() {

    let Role = localStorage.getItem("userType");
    if(Role=="LoginSuccessFullymanshitripathi708@gmail.com"){
      return true;

    }
    else{
      alertify.error("You don't have admin rights");
      this.router.navigate(['/product'])
      return true;

    }

  }

}
