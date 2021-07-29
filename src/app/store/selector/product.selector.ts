import { createSelector } from '@ngrx/store';
import { IAppState } from '../state/app.state';
import { IProductState } from '../state/product.state';

const productState = (state: IAppState) => state.product;

export const selectProductList = createSelector(
  productState,
  (state: IProductState) => state.products
);

export const selectSelectedProduct = createSelector(
  productState,
  (state: IProductState) => state.selectedProduct
);
