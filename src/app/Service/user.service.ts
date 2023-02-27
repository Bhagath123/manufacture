import { Injectable } from '@angular/core';

import {HttpClient} from "@angular/common/http";
@Injectable({
  providedIn: 'root'
})
export class UserService {
base_apiurl = 'http://127.0.0.1:8000/api/';

api_login = this.base_apiurl+'login';
api_register = this.base_apiurl+'register';


  constructor(private http:HttpClient) { 

  }
  login(details:any){
   return this.http.post(this.api_login,details);
  }

  register(details:any){
    return this.http.post(this.api_register,details);
   }


   getUser(){
    return this.http.get('http://127.0.0.1:8000/api/users');
   }

  

   getUserById(id:any){
   
    return this.http.get(`http://127.0.0.1:8000/api/users/${id}`);
   }

   updateUserById(data:any){
   
    return this.http.put(`http://127.0.0.1:8000/api/users/${data.id}`,data);
   }
}
