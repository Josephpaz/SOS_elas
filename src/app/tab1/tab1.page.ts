import { Component } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';

import { AlertController } from '@ionic/angular';
import { Platform } from '@ionic/angular';

import { Plugins } from '@capacitor/core';
const { Storage } = Plugins;


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})

export class Tab1Page {
  data: any;
  interval: any;
 
  constructor(
    //private Storage: Storage,
    public alertController: AlertController,
    private platform: Platform,
    private route: Router
  ) {
    this.data = [
      {
        nome: "",
        phoneNumber: ""
      },
      {
        nome: "",
        phoneNumber: ""
      },
      {
        nome: "",
        phoneNumber: ""
      },
      {
        nome: "",
        phoneNumber: ""
      }
    ];
  }
  
  ionViewWillEnter(){
    this.platform.ready().then(() => { //G
      this.interval = setInterval(()=> {this.reloadData()}, 1000);});
  }

  async reloadData(){
    for(let i=0;i<4;i++){
      console.log('Reload dos contatos.');
      this.data[i].nome = await Storage.get({ key: 'nome' + i });
      this.data[i].phoneNumber = await Storage.get({ key: 'phoneNumber' + i });
    }
    console.log(this.data);
  }

  async removeContato(id:number){ //G
    console.log('Contato removido');
    await Storage.remove({ key: 'nome' + id });
    await Storage.remove({ key: 'phoneNumber' + id });
  }

  async addContato(tel:string, id:number, nome:string){ //G
    await Storage.set({
      key: 'nome' + id,
      value: nome,
    });
    await Storage.set({
      key: 'phoneNumber' + id,
      value: tel,
    });
  }

  async presentAlertPrompt(id:number) { //G
    const alert = await this.alertController.create({
      header: 'Adicionar Contato',
      inputs: [
        {
          name: 'nome',
          type: 'text',
          placeholder: 'Nome'
        },
        {
          name: 'telefone',
          type: 'text',
          placeholder: 'Telefone'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: data => {
            this.addContato(data.telefone, id, data.nome);
            console.log('Confirm Ok');
          }
        }
      ]
    });

    await alert.present();
  }

  getFromContacts(i:number){ //G
    let navigationExtras: NavigationExtras = {
      state: {
        id: i
      }
    };
    this.route.navigate(['/contatos'], navigationExtras);
  }
}