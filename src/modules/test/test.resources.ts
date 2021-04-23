import axios, { AxiosPromise } from 'axios';
import { WordData } from '@common/word';
import { HistoryData, HistoryParams, TestParams } from './test.types';

export const loadWordPack = (params: TestParams): AxiosPromise<WordData[]> =>
    axios.get<WordData[]>('v1/tests', { params });
export const createHistories = (params: HistoryParams): AxiosPromise<HistoryData[]> =>
    axios.post<HistoryData[]>('v1/history', params);
