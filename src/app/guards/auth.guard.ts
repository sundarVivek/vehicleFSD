// auth.guard.ts

import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AddService } from '../add.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private addService: AddService, private router: Router) {}

  canActivate(): boolean {
    if (this.addService.getToken()) {
      return true;
    } else {
      this.router.navigate(['/select-user']);
      return false;
    }
  }
}
