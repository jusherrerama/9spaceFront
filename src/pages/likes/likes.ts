import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , ViewController} from 'ionic-angular';

import { LikesProvider } from '../../providers/likes/likes';

import { UserProvider } from '../../providers/user/user';

/**
 * Generated class for the LikesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-likes',
  templateUrl: 'likes.html',
})
export class LikesPage {

  video_id_to_see: any;
  likes: any;
    like = { user_id: '', video_id: '' , like_value: '', dislike_value: ''};
    responseData : any;
  user: any;
  type: any;
  title: any;
  constructor(public viewCtrl: ViewController,public navCtrl: NavController,
     public navParams: NavParams, public likesProvider: LikesProvider, public userProvider: UserProvider) {

     this.video_id_to_see = this.navParams.get('param1');
     this.type = this.navParams.get('type');
     if (this.type == 1){
        this.getLikes();
        this.title= 'Likes'
     }else{
       this.getdisLikes();
       this.title= 'Dislikes'
     }

  }
  getuser(id) {
    this.userProvider.getUser(id)
    .then(data => {
      this.user.append( data);
      console.log(this.user);
    });
  }
  getLikes() {
    console.log("ACCACACACACA"+ this.video_id_to_see);
    this.likesProvider.getLikesByVideo(this.video_id_to_see)
    .then(data => {
      this.likes = data;
      console.log(this.likes);
    });

  }
  getdisLikes() {
    console.log("ACCACACACACA"+ this.video_id_to_see);
    this.likesProvider.getdisLikesByVideo(this.video_id_to_see)
    .then(data => {
      this.likes = data;
      console.log(this.likes);
    });

  }
  addLike(){
  this.likesProvider.addLike(this.like)
        .then(data => {
          this.responseData = data;
          console.log(this.responseData);

        });
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
