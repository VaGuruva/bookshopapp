import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingPageComponent } from '../pages/landing-page/landing-page.component';
import { OrderBookComponent } from '../pages/order-book/order-book.component';

const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'order', component: OrderBookComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
