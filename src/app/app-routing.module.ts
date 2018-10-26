import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { IndexComponent } from './index/index.component';
import { BlogComponent } from './blog/blog.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { CategoryComponent } from './category/category.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ContactComponent } from './contact/contact.component';
import { CategoryGeneralComponent } from './category/category-general/category-general.component';
import { CategoryFilterComponent } from './category/category-filter/category-filter.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {
    path: '',
    component: IndexComponent
  },
  {
    path: 'blog',
    component: BlogComponent
  },
  {
    path: '404',
    component: NotFoundComponent
  },
  {
    path: 'cart',
    component: CartComponent
  },
  {
    path: 'checkout',
    component: CheckoutComponent
  },
  {
    path: 'product-detail',
    component: ProductDetailComponent
  },
  {
    path: 'contact',
    component: ContactComponent
  },
  {
    path: 'category',
    component: CategoryComponent,
    children: [
      {
        path: 'general',
        component: CategoryGeneralComponent
      },
      {
        path: 'filter',
        component: CategoryFilterComponent
      }
    ]
  },
  {
    path: 'login',
    component: LoginComponent
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
