import { AuthActions, AuthActionTypes } from '../auth/state/auth.actions';
import { ActionReducerMap } from '@ngrx/store';
// Reducers
import * as authReducer from '../auth/state/auth.reducer';
import { State } from '.';



export const reducers: ActionReducerMap<State> = {
    auth: authReducer.reducer
};

export function clearState(reducer) {
    return function (state, action) {

        if (action.type === AuthActionTypes.Logout) {
            state = undefined;
        }

        return reducer(state, action);
    };
}
