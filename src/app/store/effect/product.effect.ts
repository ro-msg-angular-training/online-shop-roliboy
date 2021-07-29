import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { ProductService } from 'src/app/service/product.service';
import {
  AddProduct,
  AddProductSuccess,
  DeleteProduct,
  DeleteProductSuccess,
  ProductActionTypes,
  GetProduct,
  GetProducts,
  GetProductsSuccess,
  GetProductSuccess,
  UpdateProduct,
  UpdateProductSuccess,
} from '../action/product.action';
import { AppState } from '../state/app.state';

@Injectable()
export class ProductEffects {
  constructor(
    private _actions$: Actions,
    private _store: Store<AppState>,
    private _service: ProductService
  ) {}

  getProducts$ = createEffect(() => {
    return this._actions$.pipe(
      ofType<GetProducts>(ProductActionTypes.GetProducts),
      switchMap(() => this._service.getProducts()),
      switchMap((products) => of(new GetProductsSuccess(products)))
    );
  });

  getProduct$ = createEffect(() => {
    return this._actions$.pipe(
      ofType<GetProduct>(ProductActionTypes.GetProduct),
      map((action) => action.payload),
      switchMap((id) => this._service.retrieveProduct(id)),
      switchMap((product) => of(new GetProductSuccess(product)))
    );
  });

  addProduct$ = createEffect(() => {
    return this._actions$.pipe(
      ofType<AddProduct>(ProductActionTypes.AddProduct),
      map((action) => action.payload),
      switchMap((product) => this._service.createProduct(product)),
      switchMap((product) => of(new AddProductSuccess(product)))
    );
  });

  updateProduct$ = createEffect(() => {
    return this._actions$.pipe(
      ofType<UpdateProduct>(ProductActionTypes.UpdateProduct),
      map((action) => action.payload),
      switchMap((product) =>
        this._service.updateProduct(product).pipe(map(() => product))
      ),
      switchMap((product) => of(new UpdateProductSuccess(product)))
    );
  });

  deleteProduct$ = createEffect(() => {
    return this._actions$.pipe(
      ofType<DeleteProduct>(ProductActionTypes.DeleteProduct),
      map((action) => action.payload),
      // the .pipe() after the service call transforms the returned null into the id
      // so it can be used in the next map
      switchMap((id) => this._service.deleteProduct(id).pipe(map(() => id))),
      switchMap((id) => of(new DeleteProductSuccess(id)))
    );
  });
}
