import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { VideoProvider } from '../../providers/video/video';

/**
 * Generated class for the SearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {


  constructor(public navCtrl: NavController, public navParams: NavParams, public videoProvider: VideoProvider) {
  }


  @ViewChild('text') text;
  videos: any;
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

  searchVideosByName(){
    this.getVideosByName(this.text.value);
  }
  searchVideosByCategory(){
    this.getVideosByCategory(this.text.value);
  }
  searchVideosByUser(){
    this.getVideosByUser(this.text.value);
  }

  getVideosByName(val){
    this.videoProvider.getVideosByName(val)
    .then(data => {
      this.videos = data;
      console.log(this.videos);
    });

  }

  getVideosByCategory(val){
    this.videoProvider.getVideosByCategory(val)
    .then(data => {
      this.videos = data;
      console.log(this.videos);
    });
  }

  getVideosByUser(val){
    this.videoProvider.getVideosByUser(val)
    .then(data => {
      this.videos = data;
      console.log(this.videos);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchPage');
  }

}
