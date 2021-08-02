import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { concat, of } from 'rxjs';
import { concatMap, map, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { ProductService } from 'src/app/service/product.service';
import { ShowNotification } from '../action/notification.action';
import { HidePreloader, ShowPreloader } from '../action/preload.action';
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
import { selectProductList } from '../reducer/product.reducer';
import { AppState } from '../state/app.state';

@Injectable()
export class ProductEffects {
  constructor(
    private _actions$: Actions,
    private _store: Store<AppState>,
    private _service: ProductService,
    private _location: Location
  ) {}

  getProducts$ = createEffect(() => {
    return this._actions$.pipe(
      ofType<GetProducts>(ProductActionTypes.GetProducts),
      withLatestFrom(this._store.select(selectProductList)),
      concatMap(([action, products]) => {
        // don't make request to server if the products array is already populated
        // there's probably a better way of doing this
        if (products.length) {
          return of(new GetProductsSuccess(products));
        } else {
          return concat(
            of(new ShowPreloader()),
            this._service
              .getProducts()
              .pipe(map((products) => new GetProductsSuccess(products))),
            of(new HidePreloader())
          );
        }
      })
    );
  });

  getProduct$ = createEffect(() => {
    return this._actions$.pipe(
      ofType<GetProduct>(ProductActionTypes.GetProduct),
      map((action) => action.payload),
      concatMap((id) =>
        concat(
          of(new ShowPreloader()),
          this._service
            .retrieveProduct(id)
            .pipe(map((product) => new GetProductSuccess(product))),
          of(new HidePreloader())
        )
      )
    );
  });

  addProduct$ = createEffect(() => {
    return this._actions$.pipe(
      ofType<AddProduct>(ProductActionTypes.AddProduct),
      map((action) => action.payload),
      switchMap((product) => this._service.createProduct(product)),
      tap(() => this._location.back()),
      switchMap((product) => [
        new AddProductSuccess(product),
        new ShowNotification({
          title: 'Product Added',
          content: 'new product was added successfully',
          created: new Date().getTime(),
          timeout: 2500,
          type: 'success',
        }),
      ])
    );
  });

  updateProduct$ = createEffect(() => {
    return this._actions$.pipe(
      ofType<UpdateProduct>(ProductActionTypes.UpdateProduct),
      map((action) => action.payload),
      switchMap((product) =>
        this._service.updateProduct(product).pipe(map(() => product))
      ),
      tap(() => this._location.back()),
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
      tap(() => this._location.back()),
      switchMap((id) => [
        new ShowNotification({
          title: 'Product Deleted',
          content: `product ${id} was deleted successfully`,
          created: new Date().getTime(),
          timeout: 2500,
          type: 'success',
        }),
        new DeleteProductSuccess(id)
      ])
    );
  });
}
