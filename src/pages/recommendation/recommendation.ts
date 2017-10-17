import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SearchPage } from '../search/search';

import { VideoProvider } from '../../providers/video/video';
import { Storage } from '@ionic/storage';
import { VideoPage } from '../video/video';
/**
 * Generated class for the RecommendationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-recommendation',
  templateUrl: 'recommendation.html',
})
export class RecommendationPage {
    user_id: any;
    videos: any;
  constructor(private storage: Storage,public navCtrl: NavController, public navParams: NavParams , public videoProvider: VideoProvider) {


        storage.get('user_id').then((val) => {
            this.user_id =val;
            this.getVideosR(val);
          });

  }
  search(){
    this.navCtrl.push(SearchPage);

  }

  getVideosR(id) {
    console.log("estossonnnnnn"+id);
    this.videoProvider.getMyVideosR(id)
    .then(data => {
      this.videos = data;
      console.log("estossonnnnnn");
      console.log(this.videos);
    });

  }
  goToVideo(id){
    this.navCtrl.push(VideoPage,{ "param1":id});
  }

}
