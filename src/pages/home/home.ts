import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { VideoProvider } from '../../providers/video/video';
import { VideoPage } from '../video/video';
import { Storage } from '@ionic/storage';
import { SearchPage } from '../search/search';

import { LikesProvider } from '../../providers/likes/likes';
import { LikesPage }from '../likes/likes';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  videos: any;
  user_id: any;
  constructor(private storage: Storage,public navCtrl: NavController,
     public navParams: NavParams, public videoProvider: VideoProvider, public likesProvider: LikesProvider) {

     storage.get('user_id').then((val) => {
                   this.user_id =val;
                   this.getVideos();
    });

  }
  likes = new Map<  number, boolean>();
  dislikes= new Map<  number, boolean>() ;
  p_like: any;
  c_like: any;
  responseData : any;
  ionViewWillEnter() {
    console.log("I'm alive!");
    this.getVideos();
  }
  likesVideo(id) {
     this.navCtrl.push(LikesPage,{ "param1":id,"type":1 });
   }
   dislikesVideo(id) {
      this.navCtrl.push(LikesPage,{ "param1":id,"type":0});
    }
userLike(id) {
      console.log("estossonnnnnn"+this.user_id+"sas"+id);
      this.likesProvider.userLike(this.user_id,id)
      .then(data => {
        this.p_like = data;
        if (this.p_like.length ==1){
          console.log(this.p_like[0].like_value);
          this.likes.set(id ,this.p_like[0].like_value );
          this.dislikes.set(id ,this.p_like[0].dislike_value );
        }
        else{
          this.likes.set(id ,false );
          this.dislikes.set(id ,false );
              }
      });
    }
 addLike(like){
    this.likesProvider.addLike(like)
          .then(data => {
            this.responseData = data;
            console.log(this.responseData);
              this.getVideos(); //);
          });

  }
  dislike( id ){
    if (this.dislikes.get(id)){//Quitar dislike
          this.dislikes.set(id ,false );
          this.c_like = { user_id:  String(this.user_id), video_id:  String(id) , like_value:  '-1', dislike_value: '0'};
          this.addLike(this.c_like);
    }else {//Ponet dislike
      if (this.likes.get(id)){//quitar like , poner dislike
          this.dislikes.set(id ,true );
          this.likes.set(id ,false );
          this.c_like = { user_id:  String(this.user_id), video_id:  String(id) , like_value:  '0', dislike_value: '1'};
          this.addLike(this.c_like);
      }else {//dislike por primera vez
         this.dislikes.set(id ,true );
         this.c_like = { user_id:  String(this.user_id), video_id:  String(id) , like_value:  '-1', dislike_value: '1'};
         this.addLike(this.c_like);
      }
    }
  }
  like( id ){
    if (this.likes.get(id)){//Quitar like
          this.likes.set(id ,false );
          this.c_like = { user_id: String(this.user_id), video_id:  String(id) , like_value:  '0', dislike_value: '-1'};
          this.addLike(this.c_like);
    }else {//Ponet dislike
      if (this.dislikes.get(id)){//quitar dislike , poner like
          this.likes.set(id ,true );
          this.dislikes.set(id ,false );
          this.c_like = { user_id: String(this.user_id), video_id:  String(id) , like_value:  '1', dislike_value: '0'};
          this.addLike(this.c_like);
      }else {//like por primera vez
          this.likes.set(id ,true );
          this.c_like = { user_id: String(this.user_id), video_id:  String(id) , like_value:  '1', dislike_value: '-1'};
          this.addLike(this.c_like);
      }
    }
  }
  getVideos() {

    console.log(this.videoProvider.getVideos());
    this.videoProvider.getVideos()
    .then(data => {
      this.videos = data;
      for (let entry of this.videos) {
          this.userLike(entry.id);
      }
    });

  }

    goToVideo(id,user_id){
      this.navCtrl.push(VideoPage,{ "param1":id,"user":user_id});
    }


  search(){
    this.navCtrl.push(SearchPage);
  }
}
