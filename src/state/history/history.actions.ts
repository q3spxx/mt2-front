import { ActionsFactory } from '../actions.factory';

const historyFactory = new ActionsFactory('history');

export const fetchHistoryAction = historyFactory.createReadAction<void, HistoryData[]>('history');
export const createHistoryAction = historyFactory.createInsertAction<HistoryParams>('history');
