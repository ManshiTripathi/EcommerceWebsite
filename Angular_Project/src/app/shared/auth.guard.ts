import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Route, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiService } from '../service/api.service';
import  *as alertify from 'alertifyjs';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {
  constructor( private api : ApiService,private router :Router){

  }
  canActivate ()
    {
     if(this.api.IsLoggedIn())
     {
       return true;

      }
    alertify.error("You have not Logged in");
   this.router.navigate(['/home']);
   return false;
  }

}
