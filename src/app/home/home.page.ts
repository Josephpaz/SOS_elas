import { Component } from "@angular/core";
import {
  CameraPreview,
  CameraPreviewPictureOptions,
  CameraPreviewOptions,
  CameraPreviewDimensions
} from "@ionic-native/camera-preview/ngx";
import { item } from '../services/storage.service';

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"]
})


export class HomePage {
  picture: string;

  cameraOpts: CameraPreviewOptions = {//opcões da camera
    x: 100,
    y: 100,
    width: 100,
    height: 100,
    toBack: true
  };

  cameraPictureOpts: CameraPreviewPictureOptions = {//opções da imagem
    width: 100,
    height: 100,
    quality: 100
  };
  items: item[]=[];
  newItem: item=<item>{};
  constructor(private cameraPreview: CameraPreview) {}
  

  async startCamera() {
    this.picture = null;
    const result = await this.cameraPreview.startCamera(this.cameraOpts);
    console.log(result);
  }
  

  async switchCamera() { //pra mudar de camera frontal/traseira
    this.cameraPreview.switchCamera();
    console.log("Camera invertida");
  }

  async takePicture() {
   console.log("foto tirada");
    const result = await this.cameraPreview.takePicture(this.cameraPictureOpts);
    await this.cameraPreview.stopCamera();
    this.picture = `data:image/jpeg;base64,${result}`;
  }

}