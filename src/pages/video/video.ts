import { Component } from '@angular/core';
import { ModalController, IonicPage, NavController, NavParams,ActionSheetController } from 'ionic-angular';

import { VideoProvider } from '../../providers/video/video';
import { UserProvider } from '../../providers/user/user';
import { Storage } from '@ionic/storage';
import { MyVideosPage }from '../my-videos/my-videos';
import { CommentsProvider } from '../../providers/comments/comments';
import { LikesPage }from '../likes/likes';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
     public actionSheetCtrl: ActionSheetController) {
       this.myForm = this.formBuilder.group({
           text: ['', Validators.required]
         });
       storage.get('user_id').then((val) => {
           console.log("acacaca"+val)

           this.usser(val);
         });



         this.user_id_to_see = this.navParams.get('param1');

         this.newComment.user_id = this.user_id_to_see
        this.addMyVideosR();
        this.getVideo();

  }
  presentModal(id) {
      console.log("aSIII ES EPERFIILL ENTRAsssssssssssssssA" + id)
     this.navCtrl.push(LikesPage,{ "param1":id});
   }


  usser(id){
      this.user_id =id;
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
          text: 'Delete Vidio',
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


    this.videoProvider.addMyVideosR(this.video_id,1)
    .then(data => {
      console.log(data);
    });
  }
  getVideo() {
    this.video_id = this.navParams.get("param1");
    console.log(this.video_id);
    this.videoProvider.getVideo(this.video_id)
    .then(data => {
      this.videos = data;
      console.log( this.videos);
        this.newComment.video_id = this.videos.id
        this.getuser();
        this.getComments();
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

        });
    this.navCtrl.setRoot(VideoPage,{ "param1":this.videos.id});
  }
  goToUser(id){

    this.navCtrl.push(MyVideosPage,{ "param1":id});

  }
}
