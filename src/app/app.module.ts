import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/login/login';
import { StartPage } from '../pages/start/start';
import { SearchPage } from '../pages/search/search';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { VideoProvider } from '../providers/video/video';



import { HttpClientModule } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { HttpEvent } from '@angular/common/http';
/*
import { VideoPlayer } from '@ionic-native/video-player';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { Camera } from '@ionic-native/camera';
import { MediaCapture, MediaFile, CaptureError, CaptureImageOptions,CaptureVideoOptions } from '@ionic-native/media-capture';
import { StreamingMedia, StreamingVideoOptions } from '@ionic-native/streaming-media';
import { VideosProvider } from '../providers/videos/videos';


*/
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    StartPage,
    SearchPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    StartPage,
    SearchPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    VideoProvider,/*
    FileTransfer,
    FileTransferObject,
    File,
    Camera,
    StreamingMedia,
    MediaCapture,
    VideosProvider,
    VideoPlayer*/
  ]
})
export class AppModule {}
