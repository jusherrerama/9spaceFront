import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { Base64 } from '@ionic-native/base64';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/login/login';
import { StartPage } from '../pages/start/start';
import { SearchPage } from '../pages/search/search';
import { SignupPage } from '../pages/signup/signup';
import { VideoPage } from '../pages/video/video';
import { UploadVideoPage } from '../pages/upload-video/upload-video';
import { RecommendationPage } from '../pages/recommendation/recommendation';

import { LikesPage } from '../pages/likes/likes';
import { MyVideosPage } from '../pages/my-videos/my-videos';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { VideoProvider } from '../providers/video/video';



import { HttpClientModule } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { HttpEvent } from '@angular/common/http';

import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { Camera } from '@ionic-native/camera';

import { MediaCapture, MediaFile, CaptureError, CaptureImageOptions,CaptureVideoOptions } from '@ionic-native/media-capture';

import { StreamingMedia, StreamingVideoOptions } from '@ionic-native/streaming-media';

import { IonicStorageModule } from '@ionic/storage';
import { UserProvider } from '../providers/user/user';
import { LikesProvider } from '../providers/likes/likes';
import { CommentsProvider } from '../providers/comments/comments';
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
    SearchPage,
    SignupPage,
    VideoPage,
    UploadVideoPage,
    RecommendationPage,
    MyVideosPage,
    LikesPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    StartPage,
    SearchPage,
    SignupPage,
    VideoPage,
    UploadVideoPage,
    RecommendationPage,
    MyVideosPage,
    LikesPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    VideoProvider,
    FileTransfer,
    FileTransferObject,
    File,
    Camera,
    StreamingMedia,
    MediaCapture,
    UserProvider,
    LikesProvider,
    CommentsProvider,
    Base64
/*,
    VideoPlayer*/
  ]
})
export class AppModule {}
