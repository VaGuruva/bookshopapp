import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PageHeaderComponent } from './components/page-header/page-header.component';
import { PageFooterComponent } from './components/page-footer/page-footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { BookComponent } from './components/book/book.component';
import { OrderBookComponent } from './pages/order-book/order-book.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { GraphQLModule } from './graphql.module';
import { HttpClientModule } from '@angular/common/http';
import { BuyBookComponent } from './components/buy-book/buy-book.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ViewOrdersComponent } from './pages/view-orders/view-orders.component';
import { MatTableModule } from '@angular/material/table';
import { UserLoginComponent } from './pages/user-login/user-login.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { UserRegisterComponent } from './pages/user-register/user-register.component';
import { JwtModule } from "@auth0/angular-jwt";

@NgModule({
  declarations: [
    AppComponent,
    PageHeaderComponent,
    PageFooterComponent,
    LandingPageComponent,
    BookComponent,
    OrderBookComponent,
    BuyBookComponent,
    ViewOrdersComponent,
    UserLoginComponent,
    UserRegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    GraphQLModule,
    HttpClientModule,
    MatDialogModule,
    MatTableModule,
    MatSnackBarModule,
    JwtModule.forRoot({
      config: { },
    })
  ],
  entryComponents: [
    BuyBookComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
