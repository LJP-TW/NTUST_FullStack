import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductDataBaseService } from '../product-data-base.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  constructor(private route: ActivatedRoute,private productDataBase:ProductDataBaseService) { }

  private Product:any ;
  ngOnInit() {
    this.route.params.subscribe(data => {
      // this.Product = this.productDataBase.Products.filter(obj => obj.id ==  data.id );
      console.log(this.Product);
    })
  }

}
