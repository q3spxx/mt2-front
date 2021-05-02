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

export interface TestWord {
    id: number;
    word: Word;
    type: WordType;
    variant: WordVariant;
    wrongs: number;
    testWrongs: number;
    testRating: number;
    spendedTime: number;
    rating: number;
}
