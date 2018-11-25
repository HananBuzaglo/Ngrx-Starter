import { Action } from '@ngrx/store';

export enum AuthActionTypes {
    Login = '[Auth] Login',
    LoginSuccess = '[Auth] Login Success',
    LoginFailed = '[Auth] Login Failed',
    ForgotPassword = '[Auth] Forgot Password',
    ForgotPasswordSuccess = '[Auth] Forgot Password Success',
    ForgotPasswordFailed = '[Auth] Forgot Password Failed',
    RememberMe = '[Auth] Remember Me',
    IsAuth = '[Auth] Is Authenticated',
    Logout = '[Auth] Log Out',
    ResetAuthResponses = '[Auth] Reset Auth Responses',
}


// Action Creators
export class Login implements Action {
    readonly type = AuthActionTypes.Login;

    constructor(public payload: any) {}
}

export class LoginSuccess implements Action {
    readonly type = AuthActionTypes.LoginSuccess;

    constructor(public payload: any) {}
}

export class LoginFailed implements Action {
    readonly type = AuthActionTypes.LoginFailed;

    constructor(public payload: string) {}
}

export class ForgotPassword implements Action {
    readonly type = AuthActionTypes.ForgotPassword;

    constructor(public payload: string) {}
}

export class ForgotPasswordSuccess implements Action {
    readonly type = AuthActionTypes.ForgotPasswordSuccess;

    constructor(public payload: any) {}
}

export class ForgotPasswordFailed implements Action {
    readonly type = AuthActionTypes.ForgotPasswordFailed;

    constructor(public payload: string) {}
}

export class RememberMe implements Action {
    readonly type = AuthActionTypes.RememberMe;

    constructor(public payload: boolean) {}
}

export class IsAuth implements Action {
    readonly type = AuthActionTypes.IsAuth;
}

export class Logout implements Action {
    readonly type = AuthActionTypes.Logout;
}

export class ResetAuthResponses implements Action {
    readonly type = AuthActionTypes.ResetAuthResponses;
}

// Union the valid types
export type AuthActions = Login
| LoginSuccess
| LoginFailed
| RememberMe
| IsAuth
| Logout
| ResetAuthResponses
| ForgotPassword
| ForgotPasswordSuccess
| ForgotPasswordFailed;
