import { Component } from '@angular/core';
import { ModalController, IonicPage, NavController, NavParams,ActionSheetController } from 'ionic-angular';

import { VideoProvider } from '../../providers/video/video';
import { UserProvider } from '../../providers/user/user';
import { Storage } from '@ionic/storage';
import { MyVideosPage }from '../my-videos/my-videos';

import { LikesPage }from '../likes/likes';
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
  video_id: any;
  user_id: any;
  user: any;
  user_id_to_see: any;
  profile: any;
  constructor(public modalCtrl: ModalController,private storage: Storage,public navCtrl: NavController, public navParams: NavParams,
     public videoProvider: VideoProvider, public userProvider: UserProvider,public actionSheetCtrl: ActionSheetController) {

       storage.get('user_id').then((val) => {
           console.log("acacaca"+val)

           this.usser(val);
         });



         this.user_id_to_see = this.navParams.get('param1');


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
      title: 'Video OPtions',
      buttons: [
        {
          text: 'Destructive',
          role: 'destructive',
          handler: () => {
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
        this.getuser();
    });

  }
  getuser() {

    this.userProvider.getUser(this.videos.user_id)
    .then(data => {
      this.user = data;
      console.log(this.user);
    });
  }
  goToUser(id){

    this.navCtrl.push(MyVideosPage,{ "param1":id});

  }
}
