import { Injectable } from '@angular/core';
import { 
  CanActivate, 
  ActivatedRouteSnapshot, 
  RouterStateSnapshot,
  Router, 
  UrlTree 
} from '@angular/router';

import { Plugins } from '@capacitor/core';
const { Storage } = Plugins;


//importei Router

@Injectable({
  providedIn: 'root'
})
export class GuiaGuard implements CanActivate {

  //coloquei construtor com 2 parametros e mudei canActivate para async

  constructor(private router: Router) {}
   async canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean>{

      //função para dizer se usuário completou tutorial
      let isComplete = await Storage.get({ key: 'guiaComplete' });

      if (isComplete.value != 'true') {
        this.router.navigateByUrl('/guia');
        return false;
      }else{
        return true;
      }
      //return isComplete;
  }
  
}
