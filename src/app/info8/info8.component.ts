import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-info8',
  templateUrl: './info8.component.html',
  styleUrls: ['./info8.component.scss'],
})
export class Info8Component implements OnInit {

  
  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {}

  close(){
    this.modalCtrl.dismiss();
  }
}
