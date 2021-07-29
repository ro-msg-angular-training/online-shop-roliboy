import { ActionReducerMap } from "@ngrx/store";
import { IAppState } from "../state/app.state";
import { authReducer } from "./auth.reducer";
import { cartReducer } from "./cart.reducer";
import { productReducer } from "./product.reducer";

export const appReducer: ActionReducerMap<IAppState, any> = {
    cart: cartReducer,
    product: productReducer,
    auth: authReducer
}