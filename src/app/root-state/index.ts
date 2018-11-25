import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from '../auth/state/auth.reducer';


export interface State {
    auth: AuthState;
}

// App selector features
const getAuthFeatureState = createFeatureSelector<AuthState>('auth');

//#region Auth Selectors
export const getToken = createSelector(
    getAuthFeatureState,
    state => state.token
);

export const isAuth = createSelector(
    getAuthFeatureState,
    state => state.isAuth
);

export const getAuthResponses = createSelector(
    getAuthFeatureState,
   state => state.responses
);
//#endregion
