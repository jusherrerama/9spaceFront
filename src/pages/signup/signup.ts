import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,LoadingController, Loading,
  AlertController} from 'ionic-angular';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
 public loading:Loading;
  constructor(public navCtrl: NavController, public navParams: NavParams,public formBuilder: FormBuilder,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController) {
      this.myForm = this.formBuilder.group({
          email: ['', Validators.required],
          password: ['', Validators.required]
        });
  }

  signup(){

    console.log("Email:" + this.myForm.value.email);
    console.log("Password:" + this.myForm.value.password);


      this.loading = this.loadingCtrl.create({
        dismissOnPageChange: true,
      });
      this.loading.present();

  }

}
