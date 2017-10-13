import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController, Loading, AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HomePage } from '../home/home';
import { SignupPage } from '../signup/signup';
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

  myForm: FormGroup;
  public loading:Loading;
  constructor(public navCtrl: NavController,
    public formBuilder: FormBuilder,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController) {

      this.myForm = this.formBuilder.group({
          email: ['', Validators.required],
          password: ['', Validators.required]
        });

  }

  loginUser(){

   console.log("Email:" + this.myForm.value.email);
   console.log("Password:" + this.myForm.value.password);



   this.loading = this.loadingCtrl.create({
     dismissOnPageChange: true,
   });
   this.loading.present();
 }


 goToSignup(){
   this.navCtrl.push('SignupPage');
 }

 goToResetPassword(){
   this.navCtrl.push('ResetPasswordPage');
 }

}
