import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProductComponent } from './add-product/add-product.component';
import { AuthGuard } from './auth.guard';
import { EditProductComponent } from './edit-product/edit-product.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';

const routes: Routes = [
  {
    path: 'products',
    component: ProductListComponent,
    canActivate: [AuthGuard],
    data: {role: 'user'}
  },
  {
    path: 'products/add',
    component: AddProductComponent,
    canActivate: [AuthGuard],
    data: {role: 'admin'}
  },
  {
    path: 'products/:id',
    component: ProductDetailsComponent,
    canActivate: [AuthGuard],
    data: {role: 'user'}
  },
  {
    path: 'products/:id/edit',
    component: EditProductComponent,
    canActivate: [AuthGuard],
    data: {role: 'admin'}
  },
  {
    path: 'cart',
    component: ShoppingCartComponent,
    canActivate: [AuthGuard],
    data: {role: 'customer'}
  },
  {
    path: 'login',
    component: LoginPageComponent
  },
  {
    path: '',
    redirectTo: '/products',
    pathMatch: 'full'
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
