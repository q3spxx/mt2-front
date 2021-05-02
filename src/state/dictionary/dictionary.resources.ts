import axios, { AxiosPromise } from 'axios';
import { WordParams, DeleteWordParams } from './dictionary.types';

export const loadWords = (): AxiosPromise<WordData[]> => axios.get<WordData[]>('v1/words');
export const createWord = (params: WordParams): AxiosPromise => axios.post('v1/words', params);
export const deleteWord = ({ id }: DeleteWordParams): AxiosPromise => axios.delete(`v1/words/${id}`);
export const updateWord = ({ id, ...params }: WordParams): AxiosPromise => axios.put(`v1/words/${id}`, params);
