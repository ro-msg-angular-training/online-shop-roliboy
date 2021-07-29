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
  EProductActions,
  GetProduct,
  GetProducts,
  GetProductsSuccess,
  GetProductSuccess,
  UpdateProduct,
  UpdateProductSuccess,
} from '../action/product.action';
import { IAppState } from '../state/app.state';

@Injectable()
export class ProductEffects {
  constructor(
    private _actions$: Actions,
    private _store: Store<IAppState>,
    private _service: ProductService
  ) {}

  getProducts$ = createEffect(() => {
    return this._actions$.pipe(
      ofType<GetProducts>(EProductActions.GetProducts),
      switchMap(() => this._service.getProducts()),
      switchMap((products) => of(new GetProductsSuccess(products)))
    );
  });

  getProduct$ = createEffect(() => {
    return this._actions$.pipe(
      ofType<GetProduct>(EProductActions.GetProduct),
      map((action) => action.payload),
      switchMap((id) => this._service.retrieveProduct(id)),
      switchMap((product) => of(new GetProductSuccess(product)))
    );
  });

  addProduct$ = createEffect(() => {
    return this._actions$.pipe(
      ofType<AddProduct>(EProductActions.AddProduct),
      map((action) => action.payload),
      switchMap((product) => this._service.createProduct(product)),
      switchMap((product) => of(new AddProductSuccess(product)))
    );
  });

  updateProduct$ = createEffect(() => {
    return this._actions$.pipe(
      ofType<UpdateProduct>(EProductActions.UpdateProduct),
      map((action) => action.payload),
      switchMap((product) =>
        this._service.updateProduct(product).pipe(map(() => product))
      ),
      switchMap((product) => of(new UpdateProductSuccess(product)))
    );
  });

  deleteProduct$ = createEffect(() => {
    return this._actions$.pipe(
      ofType<DeleteProduct>(EProductActions.DeleteProduct),
      map((action) => action.payload),
      // the .pipe() after the service call transforms the returned null into the id
      // so it can be used in the next map
      switchMap((id) => this._service.deleteProduct(id).pipe(map(() => id))),
      switchMap((id) => of(new DeleteProductSuccess(id)))
    );
  });
}
