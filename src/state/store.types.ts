import { DictionaryStoreState } from './dictionary';
import { HistoryStoreState } from './history';

export interface RootState {
    dictionary: DictionaryStoreState;
    history: HistoryStoreState;
}
