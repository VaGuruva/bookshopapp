import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { OrderBookComponent } from './pages/order-book/order-book.component';
import { ViewOrdersComponent } from './pages/view-orders/view-orders.component';
import { UserLoginComponent } from './pages/user-login/user-login.component';
import { UserRegisterComponent } from './pages/user-register/user-register.component';

const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'order', component: OrderBookComponent },
  { path: 'view-orders', component: ViewOrdersComponent },
  { path: 'login', component: UserLoginComponent },
  { path: 'register', component: UserRegisterComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
