import { AnyAction } from 'redux';
import { ActionsObservable } from 'redux-observable';
import { map, switchMap } from 'rxjs/operators';
import { from, Observable } from 'rxjs';
import { fetchHistoryAction, createHistoryAction } from './history.actions';
import { loadHistory, createHistory } from './history.resources';

const fetchHistoryEpic = (action$: ActionsObservable<AnyAction>): Observable<AnyAction> => {
    return action$.ofType(fetchHistoryAction.started.type).pipe(
        switchMap(() => from(loadHistory())),
        map((response) => ({
            type: fetchHistoryAction.done.type,
            payload: response.data,
        }))
    );
};

const createHistoryEpic = (action$: ActionsObservable<AnyAction>): Observable<AnyAction> =>
    action$.ofType(createHistoryAction.started.type).pipe(
        switchMap((action) => from(createHistory(action.payload))),
        map((response) => ({
            type: createHistoryAction.done.type,
            payload: response.data,
        }))
    );

export const historyEpic = [fetchHistoryEpic, createHistoryEpic];
