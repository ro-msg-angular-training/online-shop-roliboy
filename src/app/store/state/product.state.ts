import { Product } from 'src/app/model/product.model';

export interface ProductState {
  products: Product[];
  selectedProduct?: Product;
}

export const initialProductState: ProductState = {
  products: [],
  selectedProduct: undefined,
};
