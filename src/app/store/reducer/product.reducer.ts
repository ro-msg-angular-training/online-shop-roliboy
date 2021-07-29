import { EProductActions, ProductActions } from "../action/product.action"
import { initialProductState, IProductState } from "../state/product.state"

export const productReducer = (
    state = initialProductState,
    action: ProductActions
): IProductState => {
    switch (action.type) {
        case EProductActions.GetProductsSuccess: {
            return {
                ...state,
                products: action.payload
            }
        }
        case EProductActions.GetProductSuccess: {
            return {
                ...state,
                selectedProduct: action.payload
            }
        }
        case EProductActions.AddProductSuccess: {
            return {
                ...state,
                products: state.products.concat(action.payload)
            }
        }
        case EProductActions.UpdateProductSuccess: {
            return {
                ...state,
                products: state.products.map(product => product.id == action.payload.id? action.payload : product)
            }
        }
        case EProductActions.DeleteProductSuccess: {
            return {
                ...state,
                products: state.products.filter(product => product.id != action.payload)
            }
        }
        default:
            return state
    }
}