import { OrderBy } from './history-modal.types';

export const sortWithParams = (words: WordData[], orderBy: OrderBy, order: Order): WordData[] =>
    [...words].sort((wordA, wordB) => {
        const upper = orderBy === 'main' ? wordA[orderBy].name > wordB[orderBy].name : wordA[orderBy] > wordB[orderBy];
        const lower = orderBy === 'main' ? wordA[orderBy].name < wordB[orderBy].name : wordA[orderBy] < wordB[orderBy];
        if (upper) {
            return order === 'asc' ? 1 : -1;
        }

        if (lower) {
            return order === 'asc' ? -1 : 1;
        }

        return 0;
    });
