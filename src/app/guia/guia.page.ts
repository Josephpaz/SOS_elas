import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router'
import { IonSlides } from '@ionic/angular'

import { Plugins } from '@capacitor/core';
const { Storage } = Plugins;


@Component({
  selector: 'app-guia',
  templateUrl: './guia.page.html',
  styleUrls: ['./guia.page.scss'],
})
export class GuiaPage implements OnInit {

  constructor(private router: Router ) { }

  @ViewChild(IonSlides, { static: false }) slides: IonSlides;

  async finish() {
    await Storage.set({
      key: 'guiaComplete',
      value: 'true',
    });
    this.router.navigateByUrl('/');
  }

  ngOnInit() {
  }

}
