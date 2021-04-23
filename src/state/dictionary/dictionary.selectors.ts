import { RootState } from '@state/store.types';
import { DictionaryStoreState } from './dictionary.types';

export const selectDictionary = ({ dictionary }: RootState): DictionaryStoreState => dictionary;
