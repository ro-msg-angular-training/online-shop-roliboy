import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProductComponent } from './component/add-product/add-product.component';
import { AuthGuard } from './guard/auth.guard';
import { EditProductComponent } from './component/edit-product/edit-product.component';
import { LoginPageComponent } from './component/login-page/login-page.component';
import { ProductDetailsComponent } from './component/product-details/product-details.component';
import { ProductListComponent } from './component/product-list/product-list.component';
import { ShoppingCartComponent } from './component/shopping-cart/shopping-cart.component';

const routes: Routes = [
  {
    path: 'products',
    component: ProductListComponent,
    canActivate: [AuthGuard],
    data: { role: 'user' },
  },
  {
    path: 'products/add',
    component: AddProductComponent,
    canActivate: [AuthGuard],
    data: { role: 'admin' },
  },
  {
    path: 'products/:id',
    component: ProductDetailsComponent,
    canActivate: [AuthGuard],
    data: { role: 'user' },
  },
  {
    path: 'products/:id/edit',
    component: EditProductComponent,
    canActivate: [AuthGuard],
    data: { role: 'admin' },
  },
  {
    path: 'cart',
    component: ShoppingCartComponent,
    canActivate: [AuthGuard],
    data: { role: 'customer' },
  },
  {
    path: 'login',
    component: LoginPageComponent,
  },
  {
    path: '',
    redirectTo: '/products',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
