import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductDetailsComponent } from './component/product-details/product-details.component';
import { ProductListComponent } from './component/product-list/product-list.component';
import { ShoppingCartComponent } from './component/shopping-cart/shopping-cart.component';
import { EditProductComponent } from './component/edit-product/edit-product.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AddProductComponent } from './component/add-product/add-product.component';
import { LoginPageComponent } from './component/login-page/login-page.component';
import { StoreModule } from '@ngrx/store';
import { appReducer } from './store/reducer/app.reducer';
import { EffectsModule } from '@ngrx/effects';
import { CartEffects } from './store/effect/cart.effect';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { ProductEffects } from './store/effect/product.effect';
import { AuthEffects } from './store/effect/auth.effect';
import { ProductInputFormComponent } from './component/product-input-form/product-input-form.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductDetailsComponent,
    ProductListComponent,
    ShoppingCartComponent,
    EditProductComponent,
    AddProductComponent,
    LoginPageComponent,
    ProductInputFormComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    StoreModule.forRoot(appReducer),
    EffectsModule.forRoot([ProductEffects, CartEffects, AuthEffects]),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    AppRoutingModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
