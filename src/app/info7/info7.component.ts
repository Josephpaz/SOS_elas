import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-info7',
  templateUrl: './info7.component.html',
  styleUrls: ['./info7.component.scss'],
})
export class Info7Component implements OnInit {
  
  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {}

  close(){
    this.modalCtrl.dismiss();
  }
}
