import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import { HttpHeaders,HttpRequest } from '@angular/common/http';
import { Http, Headers, RequestOptions } from '@angular/http';

/*
  Generated class for the VideoProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class VideoProvider {
  apiUrl = 'http://192.168.99.101:4000/';
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
  getMyVideos(id) {
      return new Promise(resolve => {
      this.http.get(this.apiUrl+'/videos/'+id).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }
  getVideo(id) {
      return new Promise(resolve => {
      this.http.get(this.apiUrl+'/videos/1').subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

  addVideo(formData) {
    return   this.http.post("http://192.168.178.20:8080/upload", formData);
  }


}
