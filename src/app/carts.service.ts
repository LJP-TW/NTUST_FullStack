import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartsService {
  items = [
    {
      id: 1,
      name: '路卡利歐',
      price: 1000,
      quantity: 1,
      cost: 1000,
      img: '../assets/images/product1.png'
    },
    {
      id: 2,
      name: '索羅亞克',
      price: 950,
      quantity: 1,
      cost: 950,
      img: '../assets/images/product2.png'
    },
    {
      id: 3,
      name: '皮卡丘',
      price: 500,
      quantity: 1,
      cost: 500,
      img: '../assets/images/product3.png'
    }
  ];
  constructor() {}
}
