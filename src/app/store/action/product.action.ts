import { Action } from '@ngrx/store';
import { IProduct } from 'src/app/model/product.model';

export enum EProductActions {
  GetProducts = '[product] get products',
  GetProductsSuccess = '[product] get products success',
  GetProduct = '[product] get product',
  GetProductSuccess = '[product] get product success',
  AddProduct = '[product] add product',
  AddProductSuccess = '[product] add product success',
  UpdateProduct = '[product] update product',
  UpdateProductSuccess = '[product] update product success',
  DeleteProduct = '[product] delete product',
  DeleteProductSuccess = '[product] delete product success',
}

export class GetProducts implements Action {
  public readonly type = EProductActions.GetProducts;
}

export class GetProductsSuccess implements Action {
  public readonly type = EProductActions.GetProductsSuccess;
  constructor(public payload: IProduct[]) {}
}

export class GetProduct implements Action {
  public readonly type = EProductActions.GetProduct;
  constructor(public payload: number) {}
}

export class GetProductSuccess implements Action {
  public readonly type = EProductActions.GetProductSuccess;
  constructor(public payload: IProduct) {}
}

export class AddProduct implements Action {
  public readonly type = EProductActions.AddProduct;
  constructor(public payload: IProduct) {}
}

export class AddProductSuccess implements Action {
  public readonly type = EProductActions.AddProductSuccess;
  constructor(public payload: IProduct) {}
}

export class UpdateProduct implements Action {
  public readonly type = EProductActions.UpdateProduct;
  constructor(public payload: IProduct) {}
}

export class UpdateProductSuccess implements Action {
  public readonly type = EProductActions.UpdateProductSuccess;
  constructor(public payload: IProduct) {}
}

export class DeleteProduct implements Action {
  public readonly type = EProductActions.DeleteProduct;
  constructor(public payload: number) {}
}

export class DeleteProductSuccess implements Action {
  public readonly type = EProductActions.DeleteProductSuccess;
  constructor(public payload: number) {}
}

export type ProductActions =
  | GetProducts
  | GetProductsSuccess
  | GetProduct
  | GetProductSuccess
  | AddProduct
  | AddProductSuccess
  | UpdateProduct
  | UpdateProductSuccess
  | DeleteProduct
  | DeleteProductSuccess;
