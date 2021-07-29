import { createSelector } from '@ngrx/store';
import { ProductActionTypes, ProductActions } from '../action/product.action';
import { AppState } from '../state/app.state';
import { initialProductState, ProductState } from '../state/product.state';

export const productReducer = (
  state = initialProductState,
  action: ProductActions
): ProductState => {
  switch (action.type) {
    case ProductActionTypes.GetProductsSuccess: {
      return {
        ...state,
        products: action.payload,
      };
    }
    case ProductActionTypes.GetProductSuccess: {
      return {
        ...state,
        selectedProduct: action.payload,
      };
    }
    case ProductActionTypes.AddProductSuccess: {
      return {
        ...state,
        products: state.products.concat(action.payload),
      };
    }
    case ProductActionTypes.UpdateProductSuccess: {
      return {
        ...state,
        products: state.products.map((product) =>
          product.id == action.payload.id ? action.payload : product
        ),
      };
    }
    case ProductActionTypes.DeleteProductSuccess: {
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


const productState = (state: AppState) => state.product;

export const selectProductList = createSelector(
  productState,
  (state: ProductState) => state.products
);

export const selectSelectedProduct = createSelector(
  productState,
  (state: ProductState) => state.selectedProduct
);
