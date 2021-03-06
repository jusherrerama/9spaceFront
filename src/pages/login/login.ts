import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController, Loading, AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HomePage } from '../home/home';
import { SignupPage } from '../signup/signup';
import { UserProvider } from '../../providers/user/user';
import { Storage } from '@ionic/storage';
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {


  responseData : any;
  dataSet : any;
  myForm: FormGroup;
  public loading:Loading;
  user = { username: '', password: '' };

  constructor(public navCtrl: NavController,
    public formBuilder: FormBuilder,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController, public userProvider: UserProvider,private storage: Storage) {

      this.myForm = this.formBuilder.group({
          username: ['', Validators.required],
          password: ['', Validators.required]
        });



  }

 loginUser(){
  this.userProvider.login(this.user)
      .then((result) => {
        this.responseData = result;

              this.loadingCtrl.create({
                content: 'Please wait...',
                duration: 3000,
                dismissOnPageChange: true
              }).present();


        if (this.responseData.username == this.user.username ) {
	   this.storage.set('user_id',this.responseData.id );
           //this.navCtrl.setRoot(page.component);

           this.navCtrl.setRoot(HomePage);

           console.log(this.responseData.id )
        } else {
          let alert = this.alertCtrl.create({
              title: ' Impossible to login',
              subTitle: '  Username or Password incorrect',
              buttons: ['OK']
            });
            alert.present();

        }
      }, (err) => {

      });

}


 goToSignup(){
   this.navCtrl.push('SignupPage');
 }


 goToResetPassword(){
   this.navCtrl.push('ResetPasswordPage');
 }

}
