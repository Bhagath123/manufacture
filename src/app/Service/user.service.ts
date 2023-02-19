import { Injectable } from '@angular/core';

import {HttpClient} from "@angular/common/http";
@Injectable({
  providedIn: 'root'
})
export class UserService {
base_apiurl = 'http://127.0.0.1:8000/api/';

api_login = this.base_apiurl+'login';


  constructor(private http:HttpClient) { 

  }
  login(details:any){
   return this.http.post(this.api_login,details);
  }
}
