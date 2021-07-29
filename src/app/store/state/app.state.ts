import { IAuthState, initialAuthState } from "./auth.state";
import { ICartState, initialCartState } from "./cart.state";
import { initialProductState, IProductState } from "./product.state";

export interface IAppState {
    cart: ICartState,
    product: IProductState,
    auth: IAuthState
}

export const initialAppState: IAppState = {
    cart: initialCartState,
    product: initialProductState,
    auth: initialAuthState
}

export function getInitialState(): IAppState {
    return initialAppState
}