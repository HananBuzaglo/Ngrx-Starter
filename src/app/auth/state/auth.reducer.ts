import { AuthActions, AuthActionTypes } from './auth.actions';
import { Signin } from '../models/login.model';

export interface AuthState {
    signin: Signin;
    rememberMe: boolean;
    token: string;
    isAuth: boolean;
    isLoading: boolean;
    responses: any;
}

const initialState: AuthState = {
    signin: {
        username: '',
        password: ''
    },
    isAuth: false,
    isLoading: false,
    rememberMe: false,
    token: null,
    responses: {
        login: '',
        forgot: '',
        message: {
            title: '',
            message: ''
        }
    }
};

export function reducer(state = initialState, action: AuthActions): AuthState {
    switch (action.type) {

        case AuthActionTypes.Login:
            return {
                ...state,
                isLoading: true,
            };
        case AuthActionTypes.LoginSuccess:
            if (state.rememberMe) {
                localStorage.setItem('token', action.payload.Data);
            } else {
                sessionStorage.setItem('token', action.payload.Data);
            }
            return {
                ...state,
                token: action.payload.Data,
                isAuth: true,
                isLoading: false,
                responses: {
                    ...state.responses,
                    login: 'success',
                    message: {
                        title: 'AUTH.DIALOG.sfTitle',
                        message: 'AUTH.DIALOG.ssTitle'
                    }
                }
            };
        case AuthActionTypes.LoginFailed:
            sessionStorage.removeItem('token');
            return {
                ...state,
                isAuth: false,
                isLoading: false,
                responses: {
                    ...state.responses,
                    login: 'failed',
                    message: {
                        title: 'AUTH.DIALOG.sfTitle',
                        message: 'AUTH.DIALOG.sfMessage'
                    }
                }
            };
        case AuthActionTypes.ForgotPassword:
            return {
                ...state,
                isLoading: true
            };
        case AuthActionTypes.ForgotPasswordSuccess:
            return {
                ...state,
                isLoading: false,
                responses: {
                    ...state.responses,
                    forgot: 'success',
                    message: {
                        title: 'AUTH.DIALOG.fsTitle',
                        message: 'AUTH.DIALOG.fsMessage'
                    }
                }
            };
        case AuthActionTypes.ForgotPasswordFailed:
            return {
                ...state,
                isLoading: false,
                responses: {
                    ...state.responses,
                    forgot: 'failed',
                    message: {
                        title: 'AUTH.DIALOG.ffTitle',
                        message: 'AUTH.DIALOG.ffMessage'
                    }
                }
            };
        case AuthActionTypes.RememberMe:
            return {
                ...state,
                rememberMe: action.payload
            };
        case AuthActionTypes.IsAuth:
            let auth = state.isAuth;

            if (!auth) {
                const storageAuthData = sessionStorage.getItem('token');
                const localAuthData = localStorage.getItem('token');
                if (storageAuthData || localAuthData) {
                    auth = true;
                }
            }
            return {
                ...state,
                isAuth: auth
            };
        case AuthActionTypes.Logout:
            sessionStorage.clear();
            localStorage.clear();
            return {
                ...state,
                isAuth: false
            };
        case AuthActionTypes.ResetAuthResponses:
            return {
                ...state,
                responses: {
                    login: '',
                    message: {
                        title: '',
                        message: ''
                    }
                }
            };
        default:
            return state;
    }
}
