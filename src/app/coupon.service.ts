import { AuthService } from './auth.service';
import { Coupon } from './coupon';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

interface Message {
  key: string;
}

interface ListCouponResp {
  status: boolean;
  message: Message;
  coupon: Coupon[];
}

interface GetCouponResp {
  status: boolean;
  message: Message;
}

@Injectable({
  providedIn: 'root'
})
export class CouponService {

  // 優惠券s
  coupons: Coupon[] = [];

  // 是否有 getFromDB 過
  gotten = false;

  // 是否執行完 新增 coupon
  isAddCoupon = false;
  // 是否新增 coupon 錯誤
  isAddCouponError = false;
  // 使用的優惠券
  used_coupons_id = [];
  // 使用優惠券折了多少錢
  coupon_discount = 0;

  constructor(private httpClient: HttpClient,
    private authService: AuthService) {
    if (this.authService.LoggedIn()) {
      this.getFromDB();
    }
  }

  getFromDB() {
    this.coupon_discount = 0;
    this.httpClient.get(`${environment.api}/ListCoupon?token=${localStorage.getItem('token')}`).subscribe((resp: ListCouponResp) => {
      console.log(resp);
      if (resp.status) {
        this.coupons = resp.coupon;
        this.gotten = true;
      }
    }, (error: HttpErrorResponse) => {
      console.log(error);
      this.gotten = true;
    });
  }

  addCoupon(coupon_code) {
    this.isAddCoupon = false;
    this.isAddCouponError = false;
    const post = {
      token: localStorage.getItem('token'),
      coupon_code: coupon_code
    };
    this.httpClient.post(`${environment.api}/GetCoupon`, post).subscribe((resp: GetCouponResp) => {
      if (resp.status) {
        this.getFromDB();
      } else {
        this.isAddCouponError = true;
      }
      this.isAddCoupon = true;
    }, (error: HttpErrorResponse) => {
      console.log(error);
      this.isAddCouponError = true;
      this.isAddCoupon = true;
    });
  }

  switchCoupon(index) {
    const pos = this.used_coupons_id.indexOf(this.coupons[index].id);

    if (pos === -1) {
      this.used_coupons_id.push(this.coupons[index].id);
      this.coupon_discount += this.coupons[index].Discount;
    } else {
      this.used_coupons_id.splice(pos, 1);
      this.coupon_discount -= this.coupons[index].Discount;
    }
  }
}
