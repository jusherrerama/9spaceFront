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
  apiUrl = 'http://192.168.0.121:4000/'; //'http://192.168.43.153:4000/'; //'http://192.168.99.101:4000/'; //
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
      this.http.get(this.apiUrl+'/videosByUser/'+id).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }
  getMyVideosR(id) {
      return new Promise(resolve => {
      this.http.get(this.apiUrl+'/recomendate/'+id).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });

  }
  addMyVideosR(video_id,user_id) {
      return new Promise(resolve => {
      this.http.post(this.apiUrl+'recomendation/'+user_id+'/'+video_id,user_id).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });

  }

  getVideo(id) {
      return new Promise(resolve => {
      this.http.get(this.apiUrl+'/videos/'+id).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

  addVideo(data) {

	  return new Promise((resolve, reject) => {
	    this.http.post(this.apiUrl+'/videos', (data), {
    headers: new HttpHeaders().set('enctype', 'multipart/form-data')
    })
	      .subscribe(res => {
		resolve(res);
	      }, (err) => {
		reject(err);
	      });
	  });
   }



getVideosByName(name){
    return new Promise(resolve => {
      this.http.get(this.apiUrl+'searchVideoName/'+name).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });

  }

  getVideosByCategory(category){
    return new Promise(resolve => {
      this.http.get(this.apiUrl+'searchVideoCategory/'+category).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

  getVideosByUser(user){
    return new Promise(resolve => {
      this.http.get(this.apiUrl+'searchVideoUser/'+user).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }
  deleteVideo(id){
    return new Promise(resolve => {
      this.http.delete(this.apiUrl+'videos/'+id).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

}
