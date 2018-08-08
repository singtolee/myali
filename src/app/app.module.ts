import { BrowserModule } from '@angular/platform-browser';
import { registerLocaleData } from '@angular/common';
import lcoaleTh from '@angular/common/locales/th';

registerLocaleData(lcoaleTh);
import { NgModule, LOCALE_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { environment } from '../environments/environment';
import { AngularFireModule } from 'angularfire2'
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AppRoutingModule, routingComponents } from './app-routing.module';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { NgxsModule } from '@ngxs/store';
import { PrdState } from './state/prd.state';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './navbar/navbar.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule } from '@angular/material';
import { MatTabsModule } from '@angular/material/tabs';
import { MatRadioModule } from '@angular/material/radio';
import { MatBadgeModule } from '@angular/material/badge';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { CategoryListComponent } from './category-list/category-list.component';
import { ProductListComponent } from './product-list/product-list.component';
import { UserPageComponent } from './user-page/user-page.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { UserComponent } from './user/user.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { BannerComponent } from './banner/banner.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { CalculatorComponent } from './calculator/calculator.component';
import { QtypickerComponent } from './qtypicker/qtypicker.component';
import { Cny2thbPipe } from './cny2thb.pipe';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserAddressComponent } from './user-address/user-address.component';
import { UserCartComponent } from './user-cart/user-cart.component';
import { UserOrderHistoryComponent } from './user-order-history/user-order-history.component';
import { SugPricePipe } from './sug-price.pipe';
import { FloorPipe } from './floor.pipe';
import { CartbyidComponent } from './cartbyid/cartbyid.component';
import { StatusBarComponent } from './status-bar/status-bar.component';
import { FectchBankAccountComponent } from './fectch-bank-account/fectch-bank-account.component';
import { CarouselComponent } from './carousel/carousel.component';
import { ImageZoomViewComponent } from './image-zoom-view/image-zoom-view.component';
import { SmallSpinnerComponent } from './small-spinner/small-spinner.component';
import { MsgComponent } from './msg/msg.component';
import { RatingComponent } from './rating/rating.component';
import { PrdThumbnailCardComponent } from './prd-thumbnail-card/prd-thumbnail-card.component';
import { Add2cartSuccessComponent } from './add2cart-success/add2cart-success.component';
import { LoginFirstComponent } from './login-first/login-first.component';
import { ErrorMsgComponent } from './error-msg/error-msg.component';
import { NgLoginComponent } from './ng-login/ng-login.component';
export const firebaseConfig = environment.firebaseConfig;

@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    NavbarComponent,
    CategoryListComponent,
    ProductListComponent,
    UserPageComponent,
    PageNotFoundComponent,
    UserComponent,
    HomeComponent,
    FooterComponent,
    LoadingSpinnerComponent,
    BannerComponent,
    ProductDetailComponent,
    CalculatorComponent,
    QtypickerComponent,
    Cny2thbPipe,
    UserProfileComponent,
    UserAddressComponent,
    UserCartComponent,
    UserOrderHistoryComponent,
    SugPricePipe,
    FloorPipe,
    CartbyidComponent,
    StatusBarComponent,
    FectchBankAccountComponent,
    CarouselComponent,
    ImageZoomViewComponent,
    SmallSpinnerComponent,
    MsgComponent,
    RatingComponent,
    PrdThumbnailCardComponent,
    Add2cartSuccessComponent,
    LoginFirstComponent,
    ErrorMsgComponent,
    NgLoginComponent
  ],
  imports: [
    BrowserModule,
    NgxsModule.forRoot([PrdState]),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxsLoggerPluginModule.forRoot(),
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatBadgeModule,
    MatCheckboxModule,
    MatButtonModule,
    MatRadioModule,
    MatSidenavModule,
    MatExpansionModule,
    MatIconModule,
    MatListModule,
    MatDialogModule,
    MatTabsModule,
    NgbModule.forRoot()
  ],
  entryComponents:[
    NgLoginComponent,
    Add2cartSuccessComponent,
    LoginFirstComponent,
    ErrorMsgComponent,
    CarouselComponent,
    ImageZoomViewComponent,
    MsgComponent
  ],
  providers: [{provide:LOCALE_ID,useValue:'th'}],
  bootstrap: [AppComponent]
})
export class AppModule { }
