import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProductComponent } from './add-product/add-product.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';

const routes: Routes = [
  {path: 'products', component: ProductListComponent },
  {path: 'products/add', component: AddProductComponent },
  {path: 'products/:id', component: ProductDetailsComponent },
  {path: 'products/:id/edit', component: EditProductComponent },
  {path: 'cart', component: ShoppingCartComponent },
  {path: '', redirectTo: '/products', pathMatch: 'full'}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
