import { AnyAction } from 'redux';
import { ActionsObservable } from 'redux-observable';
import { map, switchMap } from 'rxjs/operators';
import { from, Observable } from 'rxjs';
import {
    fetchWordsAction,
    createWordAction,
    deleteWordAction,
    updateWordsAction,
    updateWordAction,
} from './dictionary.actions';
import { loadWords, createWord, deleteWord, updateWord } from './dictionary.resources';

const fetchWordsEpic = (action$: ActionsObservable<AnyAction>): Observable<AnyAction> => {
    return action$.ofType(fetchWordsAction.started.type).pipe(
        switchMap(() => from(loadWords())),
        map((response) => ({
            type: fetchWordsAction.done.type,
            payload: response.data,
        }))
    );
};

const createWordEpic = (action$: ActionsObservable<AnyAction>): Observable<AnyAction> =>
    action$.ofType(createWordAction.started.type).pipe(
        switchMap((action) => from(createWord(action.payload))),
        map((response) => ({
            type: createWordAction.done.type,
            payload: response.data,
        }))
    );

const createWordEpicDone = (action$: ActionsObservable<AnyAction>): Observable<AnyAction> =>
    action$.ofType(createWordAction.done.type).pipe(
        map(() => ({
            type: fetchWordsAction.started.type,
        }))
    );
const deleteWordEpic = (action$: ActionsObservable<AnyAction>): Observable<AnyAction> =>
    action$.ofType(deleteWordAction.started.type).pipe(
        switchMap((action) => from(deleteWord(action.payload))),
        map((response) => ({
            type: createWordAction.done.type,
            payload: response.data,
        }))
    );

const deleteWordEpicDone = (action$: ActionsObservable<AnyAction>): Observable<AnyAction> =>
    action$.ofType(deleteWordAction.done.type).pipe(
        map(() => ({
            type: fetchWordsAction.started.type,
        }))
    );

const updateWordsEpic = (action$: ActionsObservable<AnyAction>): Observable<AnyAction> =>
    action$.ofType(updateWordsAction.started.type).pipe(
        switchMap((action) => from(updateWord(action.payload))),
        map((response) => ({
            type: createWordAction.done.type,
            payload: response.data,
        }))
    );

const updateWordsEpicDone = (action$: ActionsObservable<AnyAction>): Observable<AnyAction> =>
    action$.ofType(updateWordsAction.done.type).pipe(
        map(() => ({
            type: fetchWordsAction.started.type,
        }))
    );

const updateWordEpic = (action$: ActionsObservable<AnyAction>): Observable<AnyAction> =>
    action$.ofType(updateWordAction.started.type).pipe(
        switchMap((action) => from(updateWord(action.payload))),
        map((response) => ({
            type: updateWordAction.done.type,
            payload: response.data,
        }))
    );

const updateWordEpicDone = (action$: ActionsObservable<AnyAction>): Observable<AnyAction> =>
    action$.ofType(updateWordAction.done.type).pipe(
        map(() => ({
            type: fetchWordsAction.started.type,
        }))
    );

export const dictionaryEpic = [
    fetchWordsEpic,
    createWordEpic,
    createWordEpicDone,
    deleteWordEpic,
    deleteWordEpicDone,
    updateWordsEpic,
    updateWordsEpicDone,
    updateWordEpic,
    updateWordEpicDone,
];
