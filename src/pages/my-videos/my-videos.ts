import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { VideoProvider } from '../../providers/video/video';
import { VideoPage } from '../video/video';
import { SearchPage } from '../search/search';

import { UserProvider } from '../../providers/user/user';
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
  user_id: any;
  user: any;
  user_id_to_see: any;
  profile: any;
  constructor(private storage: Storage, public userProvider: UserProvider,public navCtrl: NavController, public navParams: NavParams, public videoProvider: VideoProvider) {
    storage.get('user_id').then((val) => {
        console.log("acacaca"+val)

        this.getVideos(val);
      });



      this.user_id_to_see = this.navParams.get('param1');
  }

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
  search(){
    this.navCtrl.push(SearchPage);

  }


  getuser() {

    this.userProvider.getUser(this.user_id)
    .then(data => {
      this.user = data;
      console.log(this.user);
    });
  }
  getVideos(id) {
    console.log("iddddddddd"+  this.user_id_to_see)
      this.user_id =id;
      console.log("iddddddddd222222"+this.user_id)
    this.videoProvider.getMyVideos(id )
    .then(data => {
      this.videos = data;
      console.log(this.videos);
    });
    if (  (this.user_id ==  this.user_id_to_see) || (  this.user_id_to_see==null ) ){
        console.log("aSIII ES EPERFIILL ENTRAA")
        this.profile = true;

    }else {
      console.log("acacaca NO ENTRAA")
      this.user_id =this.user_id_to_see

    }
    this.getuser();
  }
  goToVideo(id){

    this.navCtrl.push(VideoPage,{ "param1":id});

  }

}
