import { Component, ViewChild  } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController,LoadingController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Camera, CameraOptions } from '@ionic-native/camera';
import { StreamingMedia, StreamingVideoOptions } from '@ionic-native/streaming-media';
/*import { VideoPlayer ,VideoOptions } from '@ionic-native/video-player';*/
import { MediaCapture, MediaFile, CaptureError, CaptureImageOptions,CaptureVideoOptions } from '@ionic-native/media-capture';
import { Base64 } from '@ionic-native/base64';
import { VideoProvider } from '../../providers/video/video';


import { Storage } from '@ionic/storage';
/**
 * Generated class for the UploadVideoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@IonicPage()
@Component({
  selector: 'page-upload-video',
  templateUrl: 'upload-video.html',
})
export class UploadVideoPage {
 videoFileName:any;
 myForm: FormGroup;
 video = { name: '', category: '', user_id: -1};
 responseData : any;
 imageURI:any;
 imageB64:any;
 @ViewChild('myvideo') myVideo: any;
videoURL: any;


  constructor(public loadingCtrl: LoadingController,private storage: Storage,private base64: Base64,public alertCtrl: AlertController,private camera: Camera,public navCtrl: NavController, public videoProvider: VideoProvider,public formBuilder: FormBuilder,private mediaCapture: MediaCapture,private streamingMedia: StreamingMedia) {
    this.myForm = this.formBuilder.group({
        name: ['', Validators.required],
        category: ['', Validators.required]
      });

      storage.get('user_id').then((val) => {
            this.video.user_id = val;
        });

  }
  getVideo() {

    this.videoURL = null;
    const options: CameraOptions = {
      quality: 100,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      mediaType: this.camera.MediaType.VIDEO
    }

    this.camera.getPicture(options).then((imageData) => {
      this.videoURL = imageData;
    }, (err) => {
    });
  }

  public selectVideo(){

    this.videoURL = null;
      let options: CaptureVideoOptions = { limit: 1, duration: 9 };
      this.videoFileName =this.mediaCapture.captureVideo(options) .then(
          (data: MediaFile[]) => {

            let videoData = JSON.stringify(data);
            let res1 = JSON.parse(videoData);
            //this.videoFileName = data;
            this.videoURL = res1[0]['fullPath'];


          },
          (err: CaptureError) => console.error(err)
        );

}
addVideo(){


    let filePath: string = this.videoURL;
    this.base64.encodeFile(filePath).then((base64File: string) => {
      this.imageB64 = base64File;
      this.imageB64 = "data:video/mp4"   + this.imageB64.substring(12,this.imageB64.length)
      this.video['address']=this.imageB64 ;


      this.loadingCtrl.create({
        content: 'Please wait...',
        duration: 4000,
        dismissOnPageChange: true
      }).present();


      this.videoProvider.addVideo(this.video).then(data => {
      this.responseData = data;
      console.log(this.responseData);
      let alert = this.alertCtrl.create({
        title: "respuesta",
        subTitle: this.responseData,
        buttons: ['OK']
      });
      alert.present();
      this.myForm.reset()
      },
      (err: CaptureError) => console.error(err)
      );
    }, (err) => {
      console.log(err);
    });



  }
}
