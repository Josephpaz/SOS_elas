import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Router, NavigationExtras } from '@angular/router';

import { BackgroundMode } from '@ionic-native/background-mode/ngx';
import { AlertController } from '@ionic/angular';
import { Platform } from '@ionic/angular';



@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {
  data: any;
  interval: any;
 
  constructor(
    private storage: Storage,
    public backgroundMode : BackgroundMode,
    public alertController: AlertController,
    private platform: Platform,
    private route: Router
  ) {
    this.data = {};
  }
  
  ionViewWillEnter(){
    this.platform.ready().then(() => { //G
      this.backgroundMode.enable();
      this.interval = setInterval(()=> {this.reloadPage()}, 1000); //0.1seg
      //this.getFromContacts();
      this.storage.get('Contatos').then((res) => {
        if(res !== null){
          console.log(res);
          this.data.Contatos = res;
        }else{
          let contatosEmerg = [
            {
              nome: "",
              telefone: ""
            },
            {
              nome: "",
              telefone: ""
            },
            {
              nome: "",
              telefone: ""
            },
            {
              nome: "",
              telefone: ""
            },
            {
              nome: "",
              telefone: ""
            }
          ];
       
          //Set Object Value
          this.setValue("Contatos", contatosEmerg);
        }
      },
      (err) => {
        console.log(err)
      });
    }); 
  }

  reloadPage(){ //solução temporaria, arrumar 
    this.storage.get('Contatos').then((res) => {
      if(res !== null){
        console.log(res);
        this.data.Contatos = res;
      }else{
        let contatosEmerg = [
          {
            nome: "",
            telefone: ""
          },
          {
            nome: "",
            telefone: ""
          },
          {
            nome: "",
            telefone: ""
          },
          {
            nome: "",
            telefone: ""
          },
          {
            nome: "",
            telefone: ""
          }
        ];
     
        //Set Object Value
        this.setValue("Contatos", contatosEmerg);
      }
    },
    (err) => {
      console.log(err)
    });
  }

  //Retirado da internet
  // set a key/value
  setValue(key: string, value: any) {
    this.storage.set(key, value).then((response) => {
      console.log('set' + key + ' ', response);
 
      //get Value Saved in key
      this.getValue(key);
 
    }).catch((error) => {
      console.log('set error for ' + key + ' ', error);
    });
  }
 
  // get a key/value pair
  getValue(key: string) {
    this.storage.get(key).then((val) => {
      console.log('get ' + key + ' ', val);
      this.data[key] = "";
      this.data[key] = val;
    }).catch((error) => {
      console.log('get error for ' + key + '', error);
    });
  }   
  //FIM Retirado da internet

  removeContato(key:string, id:number){ //G
    this.storage.get(key).then((dados) => {
      console.log(dados);
      dados[id].nome = '';
      dados[id].telefone = '';
      this.setValue("Contatos", dados);
    });
  }

  addContato(key:string, id:number, nome:string, telefone:string){ //G
    this.storage.get(key).then((dados) => {
      console.log(dados);
      dados[id].nome = nome;
      dados[id].telefone = telefone;
      this.setValue("Contatos", dados);
    });
  }

  async presentAlertPrompt(key:string, id:number) { //G
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
            this.addContato(key, id, data.nome, data.telefone);
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