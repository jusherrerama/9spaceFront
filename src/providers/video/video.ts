import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import { HttpHeaders } from '@angular/common/http';
import { Http, Headers, RequestOptions } from '@angular/http';

/*
  Generated class for the VideoProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class VideoProvider {
  apiUrl = 'http://192.168.0.121:4000/';
  dat = {};

  constructor(public http: HttpClient) {
    console.log('Hello VideoProvider Provider');
  }
  getVideos() {
      return new Promise(resolve => {
      this.http.get(this.apiUrl+'/videos').subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

}
