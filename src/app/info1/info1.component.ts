import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-info1',
  templateUrl: './info1.component.html',
  styleUrls: ['./info1.component.scss'],
})
export class Info1Component implements OnInit {

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {}

  close(){
    this.modalCtrl.dismiss();
  }

}
