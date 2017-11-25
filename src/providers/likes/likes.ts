import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import { HttpHeaders } from '@angular/common/http';
import { Http, Headers, RequestOptions } from '@angular/http';


/*
  Generated class for the LikesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LikesProvider {
  apiUrl =   'http://192.168.43.131:4000/'; // 'http://192.168.99.101:4000/'; //'http://192.168.43.153:4000/';
  dat = {};
  constructor(public http: HttpClient) {
    console.log('Hello UserProvider Provider');
  }

    userLike(user_id,videos_id) {
      return new Promise(resolve => {
      this.http.get(this.apiUrl+'/likes/likes_user_video/'+videos_id+"/"+user_id ).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
   }
  getLikesByVideo(id) {
    return new Promise(resolve => {
    this.http.get(this.apiUrl+'/likes/likes_by_video/'+id ).subscribe(data => {
      resolve(data);
    }, err => {
      console.log(err);
    });
  });
 }
 getdisLikesByVideo(id) {
   return new Promise(resolve => {
   this.http.get(this.apiUrl+'/likes/dislikes_by_video/'+id ).subscribe(data => {
     resolve(data);
   }, err => {
     console.log(err);
   });
 });
}

addLike(data) {

  return new Promise((resolve, reject) => {
    this.http.post(this.apiUrl+'/likes', JSON.stringify(data), {
  headers: new HttpHeaders().set('Content-Type', 'application/json')
  })
      .subscribe(res => {
  resolve(res);
      }, (err) => {
  reject(err);
      });
  });
 }

}
