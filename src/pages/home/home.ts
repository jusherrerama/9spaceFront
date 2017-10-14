import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { VideoProvider } from '../../providers/video/video';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  users: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public videoProvider: VideoProvider) {
      this.getVideos();
  }
  getVideos() {
    this.videoProvider.getVideos()
    .then(data => {
      this.users = data;
      console.log(this.users);
    });
  }
}
