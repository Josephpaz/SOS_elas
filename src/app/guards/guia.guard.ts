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

//importei Router

@Injectable({
  providedIn: 'root'
})
export class GuiaGuard implements CanActivate {

  //coloquei construtor com 2 parametros e mudei canActivate para async

  constructor(private storage: Storage, private router: Router) {}
   async canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean>{

      //função para dizer se usuário completou tutorial
      const isComplete = await this.storage.get('guiaComplete')

      if (!isComplete) {
        this.router.navigateByUrl('/guia')
      }
      return isComplete;
  }
  
}
