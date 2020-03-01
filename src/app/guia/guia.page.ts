import { Component, OnInit, ViewChild } from '@angular/core';
import { Storage } from '@ionic/storage'
import { Router } from '@angular/router'
import { IonSlides } from '@ionic/angular'


@Component({
  selector: 'app-guia',
  templateUrl: './guia.page.html',
  styleUrls: ['./guia.page.scss'],
})
export class GuiaPage implements OnInit {

  constructor(private storage: Storage, private router: Router ) { }

  @ViewChild(IonSlides, { static: false }) slides: IonSlides;

  async finish() {
    await this.storage.set('guiaComplete',true);
    this.router.navigateByUrl('/');
  }

  ngOnInit() {
  }

}
