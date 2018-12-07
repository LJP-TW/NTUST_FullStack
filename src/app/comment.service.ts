import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Comment } from './comment';

interface Message {
  [key: string]: any;
}

interface GetFromDBResPonse {
  status: boolean;
  message: Message;
  comment: Comment[];
}

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  comment: Comment[];

  constructor(private httpClient: HttpClient) { }

  getFromDB(ProductId) {
    this.httpClient.get(`${environment.api}/GetComment?ProductId=${ProductId}`).subscribe((data: GetFromDBResPonse) => {
      console.log(data);
      if (data.status) {
        this.comment = data.comment;

        console.log(this.comment);
      }
    }, (error: HttpErrorResponse) => {
      console.log(error);
    });
  }

  writeComment(ProductId, UserComment) {
    const Result = {
      token: localStorage.getItem('token'),
      ProductId: ProductId,
      Comment: UserComment
    };
    return this.httpClient.post(`${environment.api}/WriteComment`, Result);
  }
}
