import { Action } from 'typescript-fsa';
import { DictionaryStoreState } from './dictionary.types';
import { fetchWordsAction } from './dictionary.actions';

const initialState: DictionaryStoreState = {
    words: [],
    loading: false,
};

export const dictionary = (state = initialState, action: Action<WordData[]>): DictionaryStoreState => {
    switch (action.type) {
        case fetchWordsAction.started.type:
            return { ...state, loading: true };
        case fetchWordsAction.done.type:
            return { ...state, words: action.payload ? action.payload : [], loading: false };
        default:
            return state;
    }
};
