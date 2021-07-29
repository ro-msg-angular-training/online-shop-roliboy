import { AuthActions, EAuthActions } from "../action/auth.action";
import { IAuthState, initialAuthState } from "../state/auth.state";

export const authReducer = (
    state = initialAuthState,
    action: AuthActions
): IAuthState => {
    switch (action.type) {
        case EAuthActions.AuthLoginSuccess: {
            return {
                user: action.payload,
                hasAuthError: false,
                authErrorMessage: '',
                isAuthenticated: true
            }
        }
        case EAuthActions.AuthLoginError: {
            return {
                user: undefined,
                hasAuthError: true,
                authErrorMessage: action.payload.error,
                isAuthenticated: false
            }
        }
        default:
            return state
    }
}
