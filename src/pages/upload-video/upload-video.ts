import { Component, ViewChild  } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { StreamingMedia, StreamingVideoOptions } from '@ionic-native/streaming-media';
/*import { VideoPlayer ,VideoOptions } from '@ionic-native/video-player';*/
import { MediaCapture, MediaFile, CaptureError, CaptureImageOptions,CaptureVideoOptions } from '@ionic-native/media-capture';

import { VideoProvider } from '../../providers/video/video';
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
 video = { name: '', category: '', user_id: ''  };
 responseData : any;

 @ViewChild('myvideo') myVideo: any;
videoURL: any;


  constructor(public alertCtrl: AlertController,public navCtrl: NavController, public videoProvider: VideoProvider,public formBuilder: FormBuilder,private mediaCapture: MediaCapture,private streamingMedia: StreamingMedia) {
    this.myForm = this.formBuilder.group({
        name: ['', Validators.required],
        category: ['', Validators.required],
        user_id: ['', Validators.required],
        address: ['', Validators.required]
      });

  }

  public selectVideo(){
      this.videoURL = null;
      let options: CaptureVideoOptions = { limit: 1, duration: 10 };
      this.videoFileName= this.mediaCapture.captureVideo(options) .then(
          (data: MediaFile[]) => {

            let videoData = JSON.stringify(data);
            let res1 = JSON.parse(videoData);

            this.videoURL = res1[0]['fullPath'];

            let alert = this.alertCtrl.create({
              title: this.videoURL,
              subTitle: videoData,
              buttons: ['OK']
            });
            alert.present();
          },
          (err: CaptureError) => console.error(err)
        );

}
addVideo(){
    this.video['address']=this.videoFileName;
    this.videoProvider.addVideo(this.video);

/*
.then(data => {
  this.responseData = data;
  console.log(this.responseData);
        if(this.responseData.email2 == this.user.email2 && this.responseData.email == this.user.email && this.responseData.username == this.user.username ){

        }
              else {

       }
*/
      ;
}

}
