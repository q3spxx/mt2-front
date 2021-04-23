import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import {
    createWordAction,
    deleteWordAction,
    fetchWordsAction,
    updateWordAction,
    updateWordsAction,
} from './dictionary.actions';
import { DictionaryActions, WordParams } from './dictionary.types';

export const useDictionaryActions = (): DictionaryActions => {
    const dispatch = useDispatch();

    const loadWords = useCallback(() => {
        dispatch(fetchWordsAction.started());
    }, [dispatch]);

    const updateWords = useCallback(
        (words: WordParams[]) => {
            dispatch(updateWordsAction.started(words));
        },
        [dispatch]
    );

    const updateWord = useCallback(
        (word: WordParams) => {
            dispatch(updateWordAction.started(word));
        },
        [dispatch]
    );

    const createWord = useCallback(
        (word: WordParams) => {
            dispatch(createWordAction.started(word));
        },
        [dispatch]
    );

    const deleteWord = useCallback(
        (id: number) => {
            dispatch(deleteWordAction.started({ id }));
        },
        [dispatch]
    );

    return {
        deleteWord,
        loadWords,
        updateWords,
        createWord,
        updateWord,
    };
};
