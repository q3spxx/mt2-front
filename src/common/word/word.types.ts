export type WordType = 'verb' | 'adjective' | 'noun' | 'adverb' | 'preposition' | 'сonjunction';

export interface Word {
    name: string;
    translate: string;
}

export interface WordData {
    id: number;
    main: Word;
    secondary?: Word;
    third?: Word;
    type: WordType;
    rating: number;
    wrongs: number;
}
