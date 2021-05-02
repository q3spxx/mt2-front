import axios, { AxiosPromise } from 'axios';
import { TestParams } from './test.types';

export const loadTestWords = (params: TestParams): AxiosPromise<WordData[]> =>
    axios.get<WordData[]>('v1/tests', { params });
