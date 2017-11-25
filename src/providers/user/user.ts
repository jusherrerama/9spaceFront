import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import { HttpHeaders } from '@angular/common/http';
import { Http, Headers, RequestOptions } from '@angular/http';


/*
  Generated class for the UserProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserProvider {
  apiUrl =   'http://192.168.43.131:4000/';
  dat = {};
  constructor(public http: HttpClient) {
    console.log('Hello UserProvider Provider');
  }

  getUser(id) {
    return new Promise(resolve => {
    this.http.get(this.apiUrl+'/users/'+id ).subscribe(data => {
      resolve(data);
    }, err => {
      console.log(err);
    });
  });
 }


  addUser(data) {

          console.log(JSON.stringify(data));
	  return new Promise((resolve, reject) => {
	    this.http.post(this.apiUrl+'/register', JSON.stringify(data), {
    headers: new HttpHeaders().set('Content-Type', 'application/json')
    })
	      .subscribe(res => {
		resolve(res);
	      }, (err) => {
		reject(err);
	      });
	  });
   }

  login(credentials) {
    return new Promise((resolve, reject) => {

    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    this.http.post(this.apiUrl+'/login',JSON.stringify(credentials), {
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
