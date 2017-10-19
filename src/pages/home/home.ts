import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { VideoProvider } from '../../providers/video/video';
import { VideoPage } from '../video/video';
import { Storage } from '@ionic/storage';
import { SearchPage } from '../search/search';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  videos: any;

  constructor(private storage: Storage,public navCtrl: NavController,
     public navParams: NavParams, public videoProvider: VideoProvider) {
      this.getVideos();
  }
  like_color: any;
  dislike_color: any;
  dislike(){
    if (this.dislike_color){//Quitar like
          this.dislike_color = false;
    }else {//Ponet dislike
      if (this.like_color){//quitar like , poner dislike
          this.dislike_color = true;
          this.like_color = false;
      }else {//like por primera vez
         this.dislike_color = true;
      }
    }

  }
  like(){
    if (this.like_color){//Quitar like
          this.like_color = false;
    }else {//Ponet dislike
      if (this.dislike_color){//quitar dislike , poner like
          this.like_color = true;
          this.dislike_color = false;
      }else {//like por primera vez
         this.like_color = true;
      }
    }
  }
  getVideos() {

    console.log(this.videoProvider.getVideos());
    this.videoProvider.getVideos()
    .then(data => {
      this.videos = data;
      console.log(this.videos);
    });

  }
  goToVideo(id){

        this.navCtrl.push(VideoPage,{ "param1":id});
  }

  search(){
    this.navCtrl.push(SearchPage);
  }
}
