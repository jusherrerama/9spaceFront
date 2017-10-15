import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UploadVideoPage } from './upload-video';

@NgModule({
  declarations: [
    UploadVideoPage,
  ],
  imports: [
    IonicPageModule.forChild(UploadVideoPage),
  ],
})
export class UploadVideoPageModule {}
