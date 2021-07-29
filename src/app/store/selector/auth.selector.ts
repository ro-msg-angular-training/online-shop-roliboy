import { createSelector } from "@ngrx/store"
import { IAppState } from "../state/app.state"
import { IAuthState } from "../state/auth.state"

const authState = (state: IAppState) => state.auth

export const selectUser = createSelector(
    authState,
    (state: IAuthState) => state.user
)

export const selectIsUserAuthenticated = createSelector(
    authState,
    (state: IAuthState) => state.isAuthenticated
)

export const selectHasAuthError = createSelector(
    authState,
    (state: IAuthState) => state.hasAuthError
)

export const selectAuthErrorMessage = createSelector(
    authState,
    (state: IAuthState) => state.authErrorMessage
)

export const selectIsAdmin = createSelector(
    authState,
    (state: IAuthState) => state.user?.roles.includes('admin')
)

export const selectIsCustomer = createSelector(
    authState,
    (state: IAuthState) => state.user?.roles.includes('customer')
)
