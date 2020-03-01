import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Info1Component } from '../info1/info1.component';
import { Info2Component } from '../info2/info2.component';
import { Info3Component } from '../info3/info3.component';
import { Info4Component } from '../info4/info4.component';
import { Info5Component } from '../info5/info5.component';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  constructor(private modalCtrl: ModalController) {}

  async showModal1(){
    const modal1 = await this.modalCtrl.create({
      component: Info1Component
    })
    modal1.present();
  }
  
 async showModal2(){
    const modal2 = await this.modalCtrl.create({
      component: Info2Component
    })
    modal2.present();
  }
  
 async showModal3(){
    const modal3 = await this.modalCtrl.create({
      component: Info3Component
    })
    modal3.present();
  }
  
 async showModal4(){
    const modal4 = await this.modalCtrl.create({
      component: Info4Component
    })
    modal4.present();
  }
  
 async showModal5(){
    const modal5 = await this.modalCtrl.create({
      component: Info5Component
    })
    modal5.present();
  }
  
}