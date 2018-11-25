import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import * as authActions from './auth.actions';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { AuthService } from '../services/auth/auth.service';
import { Signin } from '../models/login.model';

@Injectable()
export class AuthEffects {

  constructor(private authService: AuthService,
              private actions$: Actions) { }

  @Effect()
  signin$: Observable<Action> = this.actions$.pipe(
      ofType(authActions.AuthActionTypes.Login),
      map((action: authActions.Login) => action.payload),
      mergeMap((signin: Signin) =>
        this.authService.signin(signin).pipe(
            map(res => (new authActions.LoginSuccess(res))),
            catchError(err => of(new authActions.LoginFailed(err)))
        )
      )
  );

  @Effect()
  forgotPassword$: Observable<Action> = this.actions$.pipe(
      ofType(authActions.AuthActionTypes.ForgotPassword),
      map((action: authActions.ForgotPassword) => action.payload),
      mergeMap(email =>
        this.authService.forgotPassword(email).pipe(
            map(res => (new authActions.ForgotPasswordSuccess(res))),
            catchError(err => of(new authActions.ForgotPasswordFailed(err)))
        )
      )
  );

}
