import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { SMS, SmsOptions } from '@ionic-native/sms/ngx';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Storage } from '@ionic/storage';
import { BackgroundMode } from '@ionic-native/background-mode/ngx';
import { DeviceMotion, DeviceMotionAccelerationData } from '@ionic-native/device-motion/ngx';
import { Media, MediaObject } from '@ionic-native/media/ngx'




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
    private deviceMotion: DeviceMotion,
    private callNumber: CallNumber
  ) {
    this.initializeApp();
  }

  flagBotaoVolumeDown: number = 0;
  flagBotaoVolumeUp: number = 0;
  intervalButton: any;
  contatos: any;

  lastX:number;
  lastY:number;
  lastZ:number;
  moveCounter:number = 0;

  initializeApp() { //roda assim q o app é aberto G
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.detectaShake();
    });     
      this.intervalButton = setInterval(()=> {this.enviaSMS(false)}, 2000); //2seg
      document.addEventListener('volumedownbutton', (event) => {
        console.log('Botao pressionado');
        this.flagBotaoVolumeDown += 1;
      });
      document.addEventListener('volumeupbutton', (event) => {
        console.log('Botao pressionado');
        this.flagBotaoVolumeUp += 1;
      });

  }

  enviaSMS(call:boolean){ //G
    if((this.flagBotaoVolumeUp >= 1 || this.flagBotaoVolumeDown >= 1) || call == true){
      console.log('Envia SMS OK');
      this.pegarContatos();
      let mensagem = 'Socorro, eu estou em uma situação de possível perigo! \n\n Minha localização:\n';
      let localizacao = 'https://www.google.com/maps/search/?api=1&query=';
      const sms = new SMS();

      this.geolocation.getCurrentPosition().then((position) => {
        let latitude = position.coords.latitude;
        let longitude = position.coords.longitude;
        let precisao = Math.floor(position.coords.accuracy);
        
        localizacao += latitude + "," + longitude + '\n Precisão:' + precisao + ' metros';
        for(let i=0; i<5; i++){
          this.sleep(1000).then(() => { this.enviarSMS(this.contatos[i].telefone, mensagem+localizacao); }); //aguarda 1 seg entre o envio do sms para cada contato, evita sobrecarga
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

  async enviarSMS(num:string, mensagem:string) { //G
    const sms = new SMS();
    const options = {
      replaceLineBreaks: true
    }
    sms.send(num, mensagem, options);
  }

  //contatos
  pegarContatos(){ //G
    this.storage.get('Contatos').then((data) => {
      this.contatos = data;
      //console.log(this.contatos);
    });
  }

  sleep(ms) { //G
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  detectaShake(){ //G
      let subscription = this.deviceMotion.watchAcceleration({frequency:200}).subscribe(acc => { //listener para o shake
        //console.log(acc);

        if(!this.lastX) {
          this.lastX = acc.x;
          this.lastY = acc.y;
          this.lastZ = acc.z;
          return;
        }
        //pega o modulo e compara com o anterior
        let deltaX:number, deltaY:number, deltaZ:number;
        deltaX = Math.abs(acc.x-this.lastX);
        deltaY = Math.abs(acc.y-this.lastY);
        deltaZ = Math.abs(acc.z-this.lastZ);
        //a diferença de velocidade deve ser maior que x
        if(deltaX + deltaY + deltaZ > 10) {
          this.moveCounter++;
        } else {
          this.moveCounter = Math.max(0, --this.moveCounter);
        }

        if(this.moveCounter > 4) { //se detectar o shake, pelo menos 10 vezes
          console.log('SHAKE');
          if(this.flagBotaoVolumeDown>0 || this.flagBotaoVolumeUp>0){
            this.enviaSMS(true);
            this.callNumber.callNumber("000", true);
            this.moveCounter=0; 
          }
        }

        this.lastX = acc.x;
        this.lastY = acc.y;
        this.lastZ = acc.z;

      });
  }

  //shake
  
}
