import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Info6Component } from '../info6/info6.component';
import { Info7Component } from '../info7/info7.component';
import { Info8Component } from '../info8/info8.component';
import { Info9Component } from '../info9/info9.component';


@Component({
  selector: 'app-tab5',
  templateUrl: 'tab5.page.html',
  styleUrls: ['tab5.page.scss']
})
export class Tab5Page {
  
  constructor(private modalCtrl: ModalController) {}

  async showModal1(){
    const modal1 = await this.modalCtrl.create({
      component: Info6Component
    })
    modal1.present();
  }

  async showModal2(){
    const modal1 = await this.modalCtrl.create({
      component: Info7Component
    })
    modal1.present();
  }

  async showModal3(){
    const modal1 = await this.modalCtrl.create({
      component: Info8Component
    })
    modal1.present();
  }

  async showModal4(){
    const modal1 = await this.modalCtrl.create({
      component: Info9Component
    })
    modal1.present();
  }
}
