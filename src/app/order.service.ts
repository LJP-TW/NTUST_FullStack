import { MonsterService } from './monster.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Order } from './order';

interface Message {
  [key: string]: any;
}

interface GetFromDBResPonse {
  status: boolean;
  message: Message;
  order: Order[];
}

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  order: Order[];

  constructor(private httpClient: HttpClient, private monsterService: MonsterService) { }

  getFromDB() {
    this.httpClient.get(`${environment.api}/GetOrders?token=${localStorage.getItem('token')}`).subscribe((data: GetFromDBResPonse) => {
      console.log(data);
      if (data.status) {
        this.order = data.order;

        console.log(this.order);
      }
    }, (error: HttpErrorResponse) => {
      console.log(error);
    });
  }
}
