import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { State } from '../reducers';

export type ThunkActionType<ReturnType = void> = ThunkAction<
    ReturnType,
    State,
    unknown,
    Action<string>
>

export interface ActionType {
    payload: any,
    error?: boolean;
    type: string;
}
