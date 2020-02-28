import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModalInfo1Component } from '../modal-info1/modal-info1.component';
import { ModalInfo2Component } from '../modal-info2/modal-info2.component';
import { ModalInfo3Component } from '../modal-info3/modal-info3.component';
import { ModalInfo4Component } from '../modal-info4/modal-info4.component';
import { ModalInfo5Component } from '../modal-info5/modal-info5.component';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  constructor(private modalCtrl: ModalController) {}

  async showModal1(){
    const modal = await this.modalCtrl.create({
      component: ModalInfo1Component
    })
    modal.present();
  }
  
 async showModal2(){
    const modal = await this.modalCtrl.create({
      component:ModalInfo2Component
    })
    modal.present();
  }
  
 async showModal3(){
    const modal = await this.modalCtrl.create({
      component: ModalInfo3Component
    })
    modal.present();
  }
  
 async showModal4(){
    const modal = await this.modalCtrl.create({
      component: ModalInfo4Component
    })
    modal.present();
  }
  
 async showModal5(){
    const modal = await this.modalCtrl.create({
      component: ModalInfo5Component
    })
    modal.present();
  }
  
}
