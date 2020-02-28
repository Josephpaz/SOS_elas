import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { BackgroundMode } from '@ionic-native/background-mode/ngx';

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
    private backgroundMode: BackgroundMode
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {

      const tempoEspera = 2;
      var clickInicial = true;
      var tempoClickInicial;

      window.addEventListener("volumebuttonslistener", onVolumeButtonsListener, false);

      function onVolumeButtonsListener() {
        if (clickInicial) {
          tempoClickInicial = new Date().getSeconds();
          clickInicial = false;
        }
        else {
          if (new Date().getSeconds() === tempoClickInicial + tempoEspera) {
            whenTimeIsReady()
            clickInicial = true;
          }
        }
      }

      function whenTimeIsReady() {
        alert("Botão pressionado");
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
