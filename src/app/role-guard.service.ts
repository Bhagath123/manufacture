import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RoleGuardService {

  constructor(
    
  ) {}

  canActivate(): boolean {
    const user = localStorage.getItem('is_admin');
    console.log(user,'user user');
    if (user  == 'true') {
      return true;
    } else {
      return false;
    }
  }
}
