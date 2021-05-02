export interface DictionaryProps {
    words: WordData[];
}

export type OrderBy = keyof Pick<WordData, 'rating' | 'type' | 'main'>;

export type Order = 'asc' | 'desc';
