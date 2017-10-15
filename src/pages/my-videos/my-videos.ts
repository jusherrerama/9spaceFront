import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { VideoProvider } from '../../providers/video/video';
/**
 * Generated class for the MyVideosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my-videos',
  templateUrl: 'my-videos.html',
})
export class MyVideosPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public videoProvider: VideoProvider) {
  }
  videos: any;
  getVideos(id) {
    console.log(this.videoProvider.getMyVideos(id));
    this.videoProvider.getMyVideos(id)
    .then(data => {
      this.videos = data;
      console.log(this.videos);
    });
  }
  goToVideo(id){


  }

}
