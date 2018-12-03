import { ActivatedRoute, Params } from '@angular/router';
import { OrderService } from './../order.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-my-order',
  templateUrl: './my-order.component.html',
  styleUrls: ['./my-order.component.css']
})
export class MyOrderComponent implements OnInit {

  orderID: number;
  hasOrderID = false;

  constructor(private authService: AuthService, public orderService: OrderService) { }

  ngOnInit() {
    this.authService.LoggedInRedirect();

    this.orderService.getFromDB();
  }
}
