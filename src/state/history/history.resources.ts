import axios, { AxiosPromise } from 'axios';
import { WordParams } from './history.types';

export const loadHistory = (): AxiosPromise<HistoryData[]> => axios.get<HistoryData[]>('v1/history');
export const createHistory = (params: WordParams): AxiosPromise => axios.post('v1/history', params);
