import { TestType } from '@common/test';
import { WordType, Word } from '@common/word';
import { ActionCreator } from 'typescript-fsa';
import { WordParams } from '@state/dictionary';

export interface TestProps {
    testType: TestType;
    maxAmount: number;
    finishTest(): void;
}

export interface TestActionProps {
    updateWords: ActionCreator<WordParams[]>;
}

export interface TestParams {
    limit: number;
}

interface History {
    wordId: number;
    wrongs: number;
    rating: number;
}

export interface HistoryParams {
    histories: History[];
}

export interface HistoryData {
    id: number;
    wordId: number;
    wrongs: number;
    rating: number;
    createdAt: string;
    updatedAt: string;
}

export interface TestWord {
    id: number;
    word: Word;
    type: WordType;
    variant: 'main' | 'secondary' | 'third';
    wrongs: number;
    testWrongs: number;
    testRating: number;
    spendedTime: number;
    rating: number;
}

export type WordVariantName = 'main' | 'secondary' | 'third';
