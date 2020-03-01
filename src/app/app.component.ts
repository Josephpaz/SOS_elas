import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { SMS, SmsOptions } from '@ionic-native/sms/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Storage } from '@ionic/storage';
import { BackgroundMode } from '@ionic-native/background-mode/ngx';
import { Shake } from '@ionic-native/shake/ngx';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private sms: SMS,
    private geolocation: Geolocation,
    private storage: Storage,
    public backgroundMode : BackgroundMode,
    private shake: Shake
  ) {
    this.initializeApp();
  }

  flagBotaoVolumeDown: number = 0;
  flagBotaoVolumeUp: number = 0;
  intervalButton: any;
  contatos: any;

  initializeApp() { //roda assim q o app é aberto
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });     
      this.intervalButton = setInterval(()=> {this.enviaSMS()}, 1500); //2seg
      document.addEventListener('volumedownbutton', (event) => {
        console.log('Botao pressionado');
        this.flagBotaoVolumeDown += 1;
      });
      document.addEventListener('volumeupbutton', (event) => {
        console.log('Botao pressionado');
        this.flagBotaoVolumeUp += 1;
      });

  }

  enviaSMS(){
    if(this.flagBotaoVolumeUp >= 2 && this.flagBotaoVolumeDown >= 2){
      console.log('Envia SMS OK');
      this.pegarContatos();
      let mensagem = 'Estou em perigo, por favor contate a polícia! \n\n Minha localização:\n';
      let localizacao = 'https://www.google.com/maps/search/?api=1&query=';
      const sms = new SMS();

      this.geolocation.getCurrentPosition().then((position) => {
        let latitude = position.coords.latitude;
        let longitude = position.coords.longitude;
        let precisao = Math.floor(position.coords.accuracy);
        
        localizacao += latitude + "," + longitude + '\n Precisão:' + precisao + ' metros';
        for(let i=0; i<5; i++){
          this.sleep(1000).then(() => { this.enviarSMS(this.contatos[i].telefone, mensagem+localizacao); });
          if(this.contatos[i].nome != ''){
            alert('Enviando SMS para:' + this.contatos[i].nome);
          }
        }
        //console.log(localizacao);
      }).catch((error) => {
          console.log('Erro ao conseguir localização: ', error);
      });
      this.flagBotaoVolumeUp = 0;
      this.flagBotaoVolumeDown = 0;
    }else{
      if(this.flagBotaoVolumeDown>0 && this.flagBotaoVolumeUp>0){
        this.flagBotaoVolumeUp -= 1;
        this.flagBotaoVolumeDown -= 1;
      }
    }
  }

  async enviarSMS(num:string, mensagem:string) {
    const sms = new SMS();
    const options = {
      replaceLineBreaks: true
    }
    sms.send(num, mensagem, options);
  }

  shakeDetecta(){
    //todo
  }

  //contatos
  pegarContatos(){
    this.storage.get('Contatos').then((data) => {
      this.contatos = data;
      //console.log(this.contatos);
    });
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
