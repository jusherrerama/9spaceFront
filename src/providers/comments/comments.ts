import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import { HttpHeaders } from '@angular/common/http';
import { Http, Headers, RequestOptions } from '@angular/http';


/*
  Generated class for the CommentsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CommentsProvider {

  apiUrl = 'http://192.168.0.17:4000/'; // 'http://192.168.99.101:4000/'; //'http://192.168.0.121:4000/'; //'http://192.168.43.75:4000/'; //
  dat = {};
  constructor(public http: HttpClient) {
    console.log('Hello UserProvider Provider');
  }
  getCommentsByVideo(id) {
    return new Promise(resolve => {
    this.http.get(this.apiUrl+'/comments/comments_by_video/'+id ).subscribe(data => {
      resolve(data);
    }, err => {
      console.log(err);
    });
  });
 }

 addComment(data) {
   return new Promise((resolve, reject) => {
     this.http.post(this.apiUrl+'/comments', JSON.stringify(data), {
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
