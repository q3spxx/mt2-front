import { RootState } from '@state/store.types';
import { HistoryStoreState } from './history.types';

export const selectHistory = ({ history }: RootState): HistoryStoreState => history;
