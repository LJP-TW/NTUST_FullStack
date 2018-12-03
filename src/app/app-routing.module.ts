import { MyOrderComponent } from './my-order/my-order.component';
import { MyAccountComponent } from './my-account/my-account.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { IndexComponent } from './index/index.component';
import { BlogComponent } from './blog/blog.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { CategoryComponent } from './category/category.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { TurnComponent } from './product-detail/turn/turn.component';
import { ContactComponent } from './contact/contact.component';
import { LoginComponent } from './login/login.component';
import { SingleBlogComponent } from './single-blog/single-blog.component';
import { RegistComponent } from './regist/regist.component';
import { ForgetPwdComponent } from './forget-pwd/forget-pwd.component';
import { AuthComponent } from './auth/auth.component';
import { ResetPwdComponent } from './reset-pwd/reset-pwd.component';

const routes: Routes = [
  {
    path: '',
    component: IndexComponent
  },
  {
    path: 'index',
    component: IndexComponent
  },
  {
    path: 'blog',
    component: BlogComponent
  },
  {
    path: 'single-blog',
    component: SingleBlogComponent
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
    path: 'product-detail/:id',
    component: TurnComponent,
  },
  {
    path: 'product-detail-content/:id',
    component: ProductDetailComponent
  },
  {
    path: 'contact',
    component: ContactComponent
  },
  {
    path: 'category',
    component: CategoryComponent,
  },
  {
    path: 'auth',
    component: AuthComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'register',
        component: RegistComponent,
      },
      {
        path: 'forgetPwd',
        component: ForgetPwdComponent,
      },
      {
        path: 'resetPwd/:token',
        component: ResetPwdComponent,
      },
      {
        path: 'myAccount',
        component: MyAccountComponent,
      },
      {
        path: 'myOrder',
        component: MyOrderComponent
      }
    ]
  },
  {
    path: '**',
    redirectTo: '/404'
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
