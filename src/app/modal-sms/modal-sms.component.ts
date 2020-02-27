import { Component, OnInit } from '@angular/core';
import { ToastController, ModalController } from '@ionic/angular';


@Component({
  selector: 'app-modal-sms',
  templateUrl: './modal-sms.component.html',
  styleUrls: ['./modal-sms.component.scss'],
})
export class ModalSMSComponent implements OnInit {

  constructor(private modalCtrl: ModalController) { 
  }

  ngOnInit() {}

  close(){
    this.modalCtrl.dismiss();
  }

}
