import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { BackgroundMode } from '@ionic-native/background-mode/ngx';
import { SMS } from '@ionic-native/sms/ngx';

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
    private backgroundMode: BackgroundMode,
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      //constante do tempo para segurar o botão (segundos)
      const tempoEspera = 2;
      //variável booleana para identificar se o clique dado no botão é o primeiro
      var clickInicial = true; 
      //variável referente ao segundo que o clique inicial foi dado
      var tempoClickInicial;

      window.addEventListener("volumebuttonslistener", onVolumeButtonsListener, false);

      function onVolumeButtonsListener() {
        if (clickInicial) {
          //pegando o tempo em que o clique inicial foi dado
          tempoClickInicial = new Date().getSeconds();
          clickInicial = false;
        }
        else {
          if (new Date().getSeconds() === tempoClickInicial + tempoEspera) {
            /*
              entrar na condição somente se o tempo em que o usuário estiver pressionando
              o botão for  igual ao tempo de espera
            */
            whenTimeIsReady()
            clickInicial = true;
          }
        }
      }

      function whenTimeIsReady() {
        const sms = new SMS();
        const num = "993438459";
        const mensagem = "Estou em perigo, por favor contate a polícia!";
        const options = {
          replaceLineBreaks: true
        }
        sms.send(num, mensagem, options)
          .then(() => alert("SMS enviado!"))
          .catch((err) => alert("Erro ao enviar sms: " + err))
      }

      this.backgroundMode.enable();
      this.backgroundMode.on('activate').subscribe(() => {
        console.log("bg mode on");
      })
      this.backgroundMode.setDefaults({ silent: true });
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
