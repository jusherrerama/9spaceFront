import { Component } from '@angular/core';
import { ModalController, IonicPage, NavController, NavParams,ActionSheetController } from 'ionic-angular';

import { VideoProvider } from '../../providers/video/video';
import { UserProvider } from '../../providers/user/user';
import { Storage } from '@ionic/storage';
import { MyVideosPage }from '../my-videos/my-videos';
import { CommentsProvider } from '../../providers/comments/comments';
import { LikesPage }from '../likes/likes';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { LikesProvider } from '../../providers/likes/likes';
/**
 * Generated class for the VideoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-video',
  templateUrl: 'video.html',
})
export class VideoPage {
  videos: any;
  comments: any;
  video_id: any;
  user_id: any;
  user: any;
  user_id_to_see: any;
  profile: any;
  newComment = { text: '', user_id: '', video_id: '' };
  responseData: any;
  myForm: FormGroup;
  constructor(public commentsProvider: CommentsProvider,public formBuilder: FormBuilder,
    public modalCtrl: ModalController,private storage: Storage,public navCtrl: NavController,
     public navParams: NavParams,
     public videoProvider: VideoProvider, public userProvider: UserProvider,
     public actionSheetCtrl: ActionSheetController, public likesProvider: LikesProvider) {
       this.myForm = this.formBuilder.group({
           text: ['', Validators.required]
         });
       storage.get('user_id').then((val) => {
           console.log("acacaca "+val)
           this.video_id = this.navParams.get("param1");
           this.usser(val);
           this.addMyVideosR();
           this.getVideo(this.video_id);
         });
         this.user_id_to_see = this.navParams.get('user');
         this.newComment.user_id = this.user_id_to_see;
  }
  like_color: any;
  dislike_color: any;
  p_like: any;

  c_like: any;
  dislike(){
    if (this.dislike_color){//Quitar like
          this.dislike_color = false;
          this.c_like = { user_id:  String(this.user_id), video_id:  String(this.video_id) , like_value:  '-1', dislike_value: '0'};
          this.addLike(this.c_like);
    }else {//Ponet dislike
      if (this.like_color){//quitar like , poner dislike
          this.dislike_color = true;
          this.like_color = false;
          this.c_like = { user_id:  String(this.user_id), video_id:  String(this.video_id) , like_value:  '0', dislike_value: '1'};
          this.addLike(this.c_like);
      }else {//like por primera vez
         this.dislike_color = true;
         this.c_like = { user_id:  String(this.user_id), video_id:  String(this.video_id) , like_value:  '-1', dislike_value: '1'};
         this.addLike(this.c_like);
      }
    }

  }
  like(){
    if (this.like_color){//Quitar like
          this.like_color = false;
          this.c_like = { user_id: String(this.user_id), video_id:  String(this.video_id) , like_value:  '0', dislike_value: '-1'};
          this.addLike(this.c_like);
    }else {//Ponet dislike
      if (this.dislike_color){//quitar dislike , poner like
          this.like_color = true;
          this.dislike_color = false;
          this.c_like = { user_id: String(this.user_id), video_id:  String(this.video_id) , like_value:  '1', dislike_value: '0'};
          this.addLike(this.c_like);
      }else {//like por primera vez
         this.like_color = true;
         this.c_like = { user_id: String(this.user_id), video_id:  String(this.video_id) , like_value:  '1', dislike_value: '-1'};
         this.addLike(this.c_like);
      }
    }
  }
  likesVideo(id) {
      console.log("aSIII ES EPERFIILL ENTRAsssssssssssssssA" + id)
     this.navCtrl.push(LikesPage,{ "param1":id,"type":'likes' });
   }
   dislikesVideo(id) {
       console.log("aSIII ES EPERFIILL ENTRAsssssssssssssssA" + id)
      this.navCtrl.push(LikesPage,{ "param1":id,"type":'dislike'});
    }

  usser(id){
      this.user_id =id;
      console.log(""+this.user_id_to_see+"aSIII ES EPERFIILL ENTRAsssssssssssssssA" + id)
      if (  (this.user_id ==  this.user_id_to_see) || (  this.user_id_to_see==null ) ){
          console.log("aSIII ES EPERFIILL ENTRAA")
          this.profile = true;
        //usuario desde el gome que quiere ver otro perfil
      }else {
        console.log("acacaca NO ENTRAA")

      }
  }
  openMenu() {
    let actionSheet = this.actionSheetCtrl.create({

      buttons: [
        {
          text: 'Delete Video',
          role: 'destructive',
          handler: () => {
             this.deleteVideo();
            console.log('Destructive clicked');
          }
        },{
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }
  addMyVideosR() {
    this.video_id = this.navParams.get("param1");
    console.log(this.video_id);
    console.log(this.user_id + "  USERRR");

    this.videoProvider.addMyVideosR(this.video_id,this.user_id )
    .then(data => {
      console.log(data);
    });
  }
  getVideo(id) {
    console.log(this.video_id);
    this.videoProvider.getVideo(id)
    .then(data => {
      this.videos = data;
      console.log( this.videos);
        this.newComment.video_id = this.videos.id
        this.userLike(this.videos.id);
        this.getuser();
        this.getComments();
    });
  }
  addLike(like){
     this.likesProvider.addLike(like)
           .then(data => {
             this.responseData = data;
             console.log(this.responseData);
               this.getVideo(this.video_id ); //);
           });

   }
  userLike(id) {
        this.likesProvider.userLike(this.user_id,id)
        .then(data => {
          this.p_like = data;
          console.log("acasacsadascascascasfdagsdghagafajnñ");
            console.log(data);
          if (this.p_like.length ==1){
            console.log(this.p_like[0].dislike_value);
            this.like_color =this.p_like[0].like_value ;
            this.dislike_color = this.p_like[0].dislike_value ;
          }
          else{
            this.like_color = false ;
            this.dislike_color = false ;
          }
        });
      }
  getuser() {

    this.userProvider.getUser(this.videos.user_id)
    .then(data => {
      this.user = data;
      console.log(this.user);
    });
  }
  deleteVideo() {
    this.videoProvider.deleteVideo(this.videos.id)

    this.navCtrl.push(MyVideosPage,{ "param1":this.videos.user_id});
  }
  getComments() {

    this.commentsProvider.getCommentsByVideo(this.videos.id)
    .then(data => {
      this.comments = data;
      console.log(this.comments);

    });

  }
  addComment(){
    console.log(this.newComment);

  this.commentsProvider.addComment(this.newComment)
        .then(data => {
          this.responseData = data;
          console.log(this.responseData);
          this.myForm.reset()
          this.getVideo(this.video_id)
        });
  }
  goToUser(id){

    this.navCtrl.push(MyVideosPage,{ "param1":id});

  }
}
