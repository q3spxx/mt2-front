import { WordData, Word, WordType } from '@common/word';

export interface DictionaryStoreState {
    words: WordData[];
}

export interface WordParams {
    id?: number;
    main?: Word;
    secondary?: Word;
    third?: Word;
    type?: WordType;
}
export interface DeleteWordParams {
    id: number;
}
export interface UpdateWordParams {
    words: WordParams[];
}

export interface DictionaryActions {
    loadWords(): void;
    updateWords(words: WordParams[]): void;
    updateWord(word: WordParams): void;
    deleteWord(id: number): void;
    createWord(word: WordParams): void;
}
