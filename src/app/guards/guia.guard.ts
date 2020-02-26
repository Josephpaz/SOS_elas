import { Injectable } from '@angular/core';
import { 
  CanActivate, 
  ActivatedRouteSnapshot, 
  RouterStateSnapshot,
  Router, 
  UrlTree 
} from '@angular/router';
import { Observable } from 'rxjs';
import { Storage } from '@ionic/storage'

@Injectable({
  providedIn: 'root'
})
export class GuiaGuard implements CanActivate {
  constructor(private storage: Storage, private router: Router) {}
  async canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
    ): Promise<boolean> {
      const isComplete = await this.storage.get('guiaComplete')

      if (!isComplete) {
        this.router.navigateByUrl('/guia')
      }
      return isComplete;
  }
  
}
