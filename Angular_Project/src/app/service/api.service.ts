import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {map} from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  public  loginApiUrl : string = "https://localhost:7106/apiHome/Login"
  constructor(private http : HttpClient) { }

  getProduct(){
    return this.http.get<any>("https://localhost:7106/apiproducts/product")
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  postproduct(data :any){
    return this.http.post<any>("https://localhost:7106/apiproducts/Post",data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  deleteproduct(id:number){

    return this.http.delete<any>("https://localhost:7106/apiproducts/Delete/" +id)
    .pipe(map((res:any)=>{
      return res;
    }))

  }
  Updateproduct(data : any ){

    return this.http.put<any>("https://localhost:7106/apiproducts/update" ,data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }


  login(userObj : any)
  {
    return this.http.post<any>(this.loginApiUrl,userObj)

  }

  postOrder(orderObj :any)
  {
    return this.http.post<any>("https://localhost:7106/apiOrderTable/add-order",orderObj)
  }

IsLoggedIn()
{
  return !!localStorage.getItem('token');
}
}
