import { Action } from '@ngrx/store';
import { Product } from 'src/app/model/product.model';

export enum ProductActionTypes {
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
  public readonly type = ProductActionTypes.GetProducts;
}

export class GetProductsSuccess implements Action {
  public readonly type = ProductActionTypes.GetProductsSuccess;
  constructor(public payload: Product[]) {}
}

export class GetProduct implements Action {
  public readonly type = ProductActionTypes.GetProduct;
  constructor(public payload: number) {}
}

export class GetProductSuccess implements Action {
  public readonly type = ProductActionTypes.GetProductSuccess;
  constructor(public payload: Product) {}
}

export class AddProduct implements Action {
  public readonly type = ProductActionTypes.AddProduct;
  constructor(public payload: Product) {}
}

export class AddProductSuccess implements Action {
  public readonly type = ProductActionTypes.AddProductSuccess;
  constructor(public payload: Product) {}
}

export class UpdateProduct implements Action {
  public readonly type = ProductActionTypes.UpdateProduct;
  constructor(public payload: Product) {}
}

export class UpdateProductSuccess implements Action {
  public readonly type = ProductActionTypes.UpdateProductSuccess;
  constructor(public payload: Product) {}
}

export class DeleteProduct implements Action {
  public readonly type = ProductActionTypes.DeleteProduct;
  constructor(public payload: number) {}
}

export class DeleteProductSuccess implements Action {
  public readonly type = ProductActionTypes.DeleteProductSuccess;
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
