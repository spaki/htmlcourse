import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';


import { OrderService } from './services/order.service';
import { BagService } from './services/bag.service';
import { PaymentMethodService } from './services/payment-method.service';
import { ProductService } from './services/product.service';
import { UserService } from './services/user.service';
import { HelperService } from './services/helper.service';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule
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
