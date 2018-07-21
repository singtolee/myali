import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { UserPageComponent } from './user-page/user-page.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/home',pathMatch: 'full'},
  { path:'home', component:HomeComponent},
  { path:'products/:category', component:ProductListComponent},
  { path:'product/:id', component:ProductDetailComponent},
  { path:'userPage', component:UserPageComponent, canActivate:[AuthGuard]},
  { path: "**", component:PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true,scrollPositionRestoration:'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [HomeComponent,ProductListComponent,ProductDetailComponent,UserPageComponent,PageNotFoundComponent]