import { Action } from 'typescript-fsa';
import { WordData } from '@common/word';
import { DictionaryStoreState } from './dictionary.types';
import { fetchWordsAction } from './dictionary.actions';

const initialState: DictionaryStoreState = {
    words: [],
};

export const dictionary = (state = initialState, action: Action<WordData[]>): DictionaryStoreState => {
    switch (action.type) {
        case fetchWordsAction.done.type:
            return { ...state, words: action.payload ? action.payload : [] };
        default:
            return state;
    }
};
