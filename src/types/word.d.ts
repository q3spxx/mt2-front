type WordType = 'verb' | 'adjective' | 'noun' | 'adverb' | 'preposition' | 'сonjunction';

interface Word {
    name: string;
    translate: string;
}

interface WordData {
    id: number;
    main: Word;
    secondary?: Word;
    third?: Word;
    type: WordType;
    rating: number;
    wrongs: number;
}
