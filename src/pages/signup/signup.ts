import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,LoadingController, Loading,
  AlertController, ToastController} from 'ionic-angular';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { UserProvider } from '../../providers/user/user';
import { LoginPage } from '../login/login';


/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  myForm: FormGroup;
  user = { username: '', email: '', email2: '', password: '' };
  responseData : any;
 public loading:Loading;
  constructor(public navCtrl: NavController, public navParams: NavParams,public formBuilder: FormBuilder,
    public alertCtrl: AlertController,public loadingCtrl: LoadingController, public userProvider: UserProvider,
   public toastCtrl:ToastController
	) {
      this.myForm = this.formBuilder.group({
          username: ['', Validators.required],
      	  email: ['', Validators.required],
      	  email2: ['', Validators.required],
          password: ['', Validators.required]
        });
  }

  signup(){
	this.userProvider.addUser(this.user)
		    .then(data => {
		      this.responseData = data;
		      console.log(this.responseData);
		      if(this.responseData.email2 == this.user.email2 && this.responseData.email == this.user.email && this.responseData.username == this.user.username ){
            let alert = this.alertCtrl.create({
              title: "SignUp",
              subTitle: "Successful",
              buttons: ['OK']
            });
            alert.present();

            this.navCtrl.push(LoginPage);
		      }
	              else {
                  let alert = this.alertCtrl.create({
                    title: "SignUp",
                    subTitle: "An error has occurred",
                    buttons: ['OK']
                  });
                  alert.present();
		     }
		    });
	}
}
