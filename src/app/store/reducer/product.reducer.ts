import { createSelector } from '@ngrx/store';
import { EProductActions, ProductActions } from '../action/product.action';
import { IAppState } from '../state/app.state';
import { initialProductState, IProductState } from '../state/product.state';

export const productReducer = (
  state = initialProductState,
  action: ProductActions
): IProductState => {
  switch (action.type) {
    case EProductActions.GetProductsSuccess: {
      return {
        ...state,
        products: action.payload,
      };
    }
    case EProductActions.GetProductSuccess: {
      return {
        ...state,
        selectedProduct: action.payload,
      };
    }
    case EProductActions.AddProductSuccess: {
      return {
        ...state,
        products: state.products.concat(action.payload),
      };
    }
    case EProductActions.UpdateProductSuccess: {
      return {
        ...state,
        products: state.products.map((product) =>
          product.id == action.payload.id ? action.payload : product
        ),
      };
    }
    case EProductActions.DeleteProductSuccess: {
      return {
        ...state,
        products: state.products.filter(
          (product) => product.id != action.payload
        ),
      };
    }
    default:
      return state;
  }
};


const productState = (state: IAppState) => state.product;

export const selectProductList = createSelector(
  productState,
  (state: IProductState) => state.products
);

export const selectSelectedProduct = createSelector(
  productState,
  (state: IProductState) => state.selectedProduct
);
