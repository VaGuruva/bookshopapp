import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { OrderBookComponent } from './pages/order-book/order-book.component';
import { ViewOrdersComponent } from './pages/view-orders/view-orders.component';

const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'order', component: OrderBookComponent },
  { path: 'view-orders', component: ViewOrdersComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
