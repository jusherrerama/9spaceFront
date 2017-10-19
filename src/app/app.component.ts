import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, AlertController, App } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/login/login';
import { StartPage } from '../pages/start/start';
import { LikesPage } from '../pages/likes/likes';

import { SignupPage } from '../pages/signup/signup';

import { VideoPage } from '../pages/video/video';
import { SearchPage } from '../pages/search/search';
import { UploadVideoPage } from '../pages/upload-video/upload-video';
import { RecommendationPage } from '../pages/recommendation/recommendation';
import { MyVideosPage } from '../pages/my-videos/my-videos';
import { VideoProvider } from '../providers/video/video';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = RecommendationPage;

  pages: Array<{title: string, component: any}>;

  constructor(public app: App, public alertCtrl: AlertController, public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'My Space', component: MyVideosPage },
      { title: 'Recommended Videos', component: RecommendationPage },
      { title: 'Upload Video Page', component: UploadVideoPage }

    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  signout(){
    this.alert('Loged Out', '');
    this.app.getRootNav().setRoot( StartPage );
  }

  alert(tittle: string, message: string) {
    const alert = this.alertCtrl.create({
      title: tittle,
      subTitle: message,
      buttons: ['Dismiss']
    });
    alert.present();
  }
}
