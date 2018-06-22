import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { routes } from './app.routes';

import { AppComponent } from './app.component';

import { OrderService } from './services/order.service';
import { BagService } from './services/bag.service';
import { PaymentMethodService } from './services/payment-method.service';
import { ProductService } from './services/product.service';
import { UserService } from './services/user.service';
import { HelperService } from './services/helper.service';

import { ProductListComponent } from './components/product-list/product-list.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ProductComponent } from './components/product/product.component';
import { LoginComponent } from './components/login/login.component';
import { NewUserComponent } from './components/new-user/new-user.component';
import { BagComponent } from './components/bag/bag.component';
import { UserComponent } from './components/user/user.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { PaginationItemComponent } from './components/pagination-item/pagination-item.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { UserBarComponent } from './components/user-bar/user-bar.component';
import { BagItemComponent } from './components/bag-item/bag-item.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    NotFoundComponent,
    ProductComponent,
    LoginComponent,
    NewUserComponent,
    BagComponent,
    UserComponent,
    ProductCardComponent,
    PaginationItemComponent,
    SearchBarComponent,
    UserBarComponent,
    BagItemComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    HelperService,
    OrderService,
    BagService,
    PaymentMethodService,
    ProductService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
