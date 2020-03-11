import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-info9',
  templateUrl: './info9.component.html',
  styleUrls: ['./info9.component.scss'],
})
export class Info9Component implements OnInit {

  
  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {}

  close(){
    this.modalCtrl.dismiss();
  }
}
