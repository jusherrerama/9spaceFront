import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { VideoProvider } from '../../providers/video/video';


/**
 * Generated class for the VideoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-video',
  templateUrl: 'video.html',
})
export class VideoPage {
  video: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public videoProvider: VideoProvider) {
  }

  getVideo(id) {
    console.log(this.videoProvider.getVideo(id));
    this.videoProvider.getVideo(IDBIndex)
    .then(data => {
      this.video = data;
      console.log(this.video);
    });
  }

}
