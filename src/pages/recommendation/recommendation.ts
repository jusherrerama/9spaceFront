import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SearchPage } from '../search/search';

import { VideoProvider } from '../../providers/video/video';
import { Storage } from '@ionic/storage';
import { VideoPage } from '../video/video';

import { LikesPage }from '../likes/likes';
import { LikesProvider } from '../../providers/likes/likes';
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
    likes = new Map<  number, boolean>();
    dislikes= new Map<  number, boolean>() ;
    p_like: any;
    c_like: any;
    responseData : any;

  constructor(private storage: Storage,public navCtrl: NavController,
    public navParams: NavParams , public videoProvider: VideoProvider, public likesProvider: LikesProvider) {


        storage.get('user_id').then((val) => {
            this.user_id =val;
            this.getVideosR(val);
          });
  }
  likesVideo(id) {
      console.log("aSIII ES EPERFIILL ENTRAsssssssssssssssA" + id)
     this.navCtrl.push(LikesPage,{ "param1":id,"type":1 });
   }
   dislikesVideo(id) {
       console.log("aSIII ES EPERFIILL ENTRAsssssssssssssssA" + id)
      this.navCtrl.push(LikesPage,{ "param1":id,"type":0});
    }
  addLike(like){
  this.likesProvider.addLike(like)
        .then(data => {
          this.responseData = data;
          console.log(this.responseData);

        });
    this.getVideosR(1 ); //this.user_id );
  }


  dislike( id ){
    this.user_id = 1
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
    this.user_id = 1
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
    console.log("entraaaa11");
    console.log(this.likes);
    console.log(this.dislikes);
  }
  search(){
    this.navCtrl.push(SearchPage);
  }

  getVideosR(id) {
    this.user_id = id;
    this.videoProvider.getMyVideosR(1)//ccocococoocococahsocmarrressssssssssssssssagllarrrr
    .then(data => {
      this.videos = data;
      for (let entry of this.videos) {
          this.userLike(entry.id); // 1, "string", false
      }
      console.log(this.videos);
    });
  }
  userLike(id) {
    console.log("estossonnnnnn"+this.user_id+"sas"+id);//ccocococoocococahsocmarrressssssssssssssssagllarrrr
    this.likesProvider.userLike(1,id)//this.user_id
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
      console.log("caaaammmbiioo");
      console.log(this.likes);
      console.log(this.dislikes);
    });
  }

  goToVideo(id){
    this.navCtrl.push(VideoPage,{ "param1":id});
  }

}
