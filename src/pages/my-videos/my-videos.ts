import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { VideoProvider } from '../../providers/video/video';
import { VideoPage } from '../video/video';
import { SearchPage } from '../search/search';

import { LikesProvider } from '../../providers/likes/likes';
import { LikesPage }from '../likes/likes';
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
  constructor(private storage: Storage, public userProvider: UserProvider,
    public navCtrl: NavController, public likesProvider: LikesProvider,
     public navParams: NavParams, public videoProvider: VideoProvider) {
    storage.get('user_id').then((val) => {
        console.log("acacaca"+val)

        this.getVideos(val);
      });



      this.user_id_to_see = this.navParams.get('param1');
  }

  videos: any;
  likes = new Map<  number, boolean>();
  dislikes= new Map<  number, boolean>() ;
  p_like: any;
  c_like: any;
  responseData : any;

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
              this.getVideos(this.user_id ); //);
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
      for (let entry of this.videos) {
          this.userLike(entry.id);
      }
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

    goToVideo(id,user_id){
      this.navCtrl.push(VideoPage,{ "param1":id,"user":user_id});
    }


}
