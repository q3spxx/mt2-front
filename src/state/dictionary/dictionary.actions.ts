import { ActionsFactory } from '../actions.factory';
import { WordParams } from './dictionary.types';

const dictionaryFactory = new ActionsFactory('dictionary');

export const fetchWordsAction = dictionaryFactory.createReadAction<void, WordData[]>('words');
export const createWordAction = dictionaryFactory.createInsertAction<WordParams>('word');
export const deleteWordAction = dictionaryFactory.createDeleteAction<{ id: number }>('word');
export const updateWordAction = dictionaryFactory.createUpdateAction<WordParams>('word');
export const updateWordsAction = dictionaryFactory.createUpdateAction<WordParams[]>('words');
