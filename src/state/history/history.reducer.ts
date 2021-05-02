import { Action } from 'typescript-fsa';
import { HistoryStoreState } from './history.types';
import { fetchHistoryAction } from './history.actions';

const initialState: HistoryStoreState = {
    history: [],
    loading: false,
};

export const history = (state = initialState, action: Action<HistoryData[]>): HistoryStoreState => {
    switch (action.type) {
        case fetchHistoryAction.started.type:
            return { ...state, loading: true };
        case fetchHistoryAction.done.type:
            return { ...state, history: action.payload ? action.payload : [], loading: false };
        default:
            return state;
    }
};
