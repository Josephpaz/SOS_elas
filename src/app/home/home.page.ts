import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Media, MediaObject } from '@ionic-native/media/ngx'
import { File } from '@ionic-native/file/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  // mediaFiles = [];
  recording: boolean = false;
  filePath: string;
  fileName: string;
  audio: MediaObject;
  audioList: any[] = [];

  constructor(
    public navCtrl: NavController,
    private media: Media,
    private file: File

  ) { }

  getAudioList() {
    //entrar na condição somente se houver áudios salvos localmente no disp. do usuário
    if (localStorage.getItem("audiolist")) {
      //fazendo o parse p/ JSON dos áudios obtidos localmente
      this.audioList = JSON.parse(localStorage.getItem("audiolist"));
      // console.log(this.audioList);
    }
  }

  ionViewWillEnter() {
    //Assim que a view for carregar, essa função será chamada para carregar a lista de áudios (se houver)
    this.getAudioList();
  }

  startRecord() {
    //nomenado o audio de acordo com a data e hora que foi gravado, para evitar áudios com mesmo nome
    this.fileName = 'audio' + new Date().getDate() + new Date().getMonth() + 1 + new Date().getFullYear() + new Date().getHours() + new Date().getMinutes() + new Date().getSeconds() + '.3gp';

    /*
      fazendo o caminho do áudio e renomeando o caminho original (gerado automaticamente) com regex
      e substituindo pelo nome gerado na variável anterior
    */
    this.filePath = this.file.externalDataDirectory.replace(/file:\/\//g, '') + this.fileName;

    //criando o áudio/caminho
    this.audio = this.media.create(this.filePath);

    this.audio.startRecord();
    this.recording = true;
  }

  stopRecord() {
    this.audio.stopRecord();

    //recolhendo o áudio quando o usuário parar de gravar
    let data = { filename: this.fileName };

    //adicionando o áudio na lista de áudios
    this.audioList.push(data);

    //salvando localmente em JSON
    localStorage.setItem("audiolist", JSON.stringify(this.audioList));

    this.recording = false;
    this.getAudioList();
  }

  playAudio(file) {
    //achando o áudio para ser tocado de acordo com o formato do nome
    this.filePath = this.file.externalDataDirectory.replace(/file:\/\//g, '') + file;

    //recuperando o áudio do caminho achado
    this.audio = this.media.create(this.filePath);

    this.audio.play();
    this.audio.setVolume(1); //os parâmetros de setVolume devem estar em um intervalo de 0 até 1.
  }
}
