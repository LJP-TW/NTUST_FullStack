import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment'
import { Reply } from './reply';

@Injectable({
  providedIn: 'root'
})
export class CustomerHelpService {

  constructor(private http:HttpClient) { }
  
  report(data){
    return this.http.post(`${environment.api}/customer-reply`,data,{
      headers:{
        Authorization : `bearer ${localStorage.getItem('token')}`,
      } 
    });
  }
}
