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
