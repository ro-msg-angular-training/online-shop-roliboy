import { IProduct } from 'src/app/model/product.model';

export interface IProductState {
  products: IProduct[];
  selectedProduct?: IProduct;
}

export const initialProductState: IProductState = {
  products: [],
  selectedProduct: undefined,
};
