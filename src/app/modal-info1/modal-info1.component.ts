import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-info1',
  templateUrl: './modal-info1.component.html',
  styleUrls: ['./modal-info1.component.scss'],
})
export class ModalInfo1Component implements OnInit {

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {}
  
  close(){
    this.modalCtrl.dismiss();
  }
}
