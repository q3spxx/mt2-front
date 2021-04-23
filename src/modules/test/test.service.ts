import { Word } from '@common/word';
import { TestType } from '@common/test';
import { TestWord } from './test.types';
import { TEST_VARIANTS } from './test.constants';

export const getTestWord = (testType: TestType, word: WordData): TestWord => {
    const { id, type, wrongs, rating } = word;
    const variantName = TEST_VARIANTS[word.type === 'verb' ? Math.floor(Math.random() * 3) : 0];
    const variant: Word | undefined = word[variantName];

    if (variant) {
        const { name, translate } = variant;

        return {
            id,
            type,
            variant: variantName,
            word: {
                name: testType === 'en2ru' ? name : translate,
                translate: testType === 'en2ru' ? translate : name,
            },
            wrongs,
            rating,
            testWrongs: 0,
            testRating: 0,
        };
    }

    return {
        id,
        type,
        variant: variantName,
        word: {
            name: '',
            translate: '',
        },
        wrongs,
        rating,
        testWrongs: 0,
        testRating: 0,
    };
};
