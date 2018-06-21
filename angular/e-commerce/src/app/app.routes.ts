import { Routes } from '@angular/router';

import { BagComponent } from './components/bag/bag.component';
import { LoginComponent } from './components/login/login.component';
import { NewUserComponent } from './components/new-user/new-user.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ProductComponent } from './components/product/product.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { UserComponent } from './components/user/user.component';

export const routes: Routes = [
  { path: '', component: ProductListComponent, pathMatch: 'full' },
  { path: 'products/:page', component: ProductListComponent },
  { path: 'products/:page/:value', component: ProductListComponent },
  { path: 'product/:id', component: ProductComponent },
  { path: 'user', component: UserComponent },
  { path: 'user/login', component: LoginComponent },
  { path: 'user/new', component: NewUserComponent },
  { path: 'bag', component: BagComponent },
  { path: '404', component: NotFoundComponent },
  { path: '**', redirectTo: '/404' }
];