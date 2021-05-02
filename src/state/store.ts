import { createStore as createReduxStore, combineReducers, applyMiddleware, Store } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createEpicMiddleware, combineEpics } from 'redux-observable';
import { dictionary, dictionaryEpic } from './dictionary';
import { history, historyEpic } from './history';
import { RootState } from './store.types';

const epicMiddleware = createEpicMiddleware();

export const createStore = (): Store<RootState> => {
    const store = createReduxStore(
        combineReducers({
            dictionary,
            history,
        }),
        composeWithDevTools(applyMiddleware(epicMiddleware))
    );

    epicMiddleware.run(combineEpics(...dictionaryEpic, ...historyEpic));

    return store;
};
