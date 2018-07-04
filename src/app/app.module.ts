import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { environment } from '../environments/environment';
import { AngularFireModule } from 'angularfire2'
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AppRoutingModule, routingComponents } from './app-routing.module';

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
import { MatDialogModule } from '@angular/material/dialog';
import { CategoryListComponent } from './category-list/category-list.component';
import { ProductListComponent } from './product-list/product-list.component';
import { UserPageComponent } from './user-page/user-page.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { UserComponent, LoginDialog } from './user/user.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { BannerComponent } from './banner/banner.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { CalculatorComponent, Add2CartDialog, LoginFirstDialog } from './calculator/calculator.component';
import { QtypickerComponent } from './qtypicker/qtypicker.component';
import { Cny2thbPipe } from './cny2thb.pipe';
import { UserProfileComponent } from './user-profile/user-profile.component';
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
    LoginDialog,
    HomeComponent,
    FooterComponent,
    LoadingSpinnerComponent,
    BannerComponent,
    ProductDetailComponent,
    CalculatorComponent,
    Add2CartDialog,
    LoginFirstDialog,
    QtypickerComponent,
    Cny2thbPipe,
    UserProfileComponent
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
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatDialogModule,
    MatTabsModule
  ],
  entryComponents:[
    LoginDialog,
    Add2CartDialog,
    LoginFirstDialog
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
