import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { createHistoryAction, fetchHistoryAction } from './history.actions';
import { HistoryActions } from './history.types';

export const useHistoryActions = (): HistoryActions => {
    const dispatch = useDispatch();

    const loadHistory = useCallback(() => {
        dispatch(fetchHistoryAction.started());
    }, [dispatch]);

    const createHistory = useCallback(
        (history: HistoryParams) => {
            dispatch(createHistoryAction.started(history));
        },
        [dispatch]
    );

    return {
        loadHistory,
        createHistory,
    };
};
