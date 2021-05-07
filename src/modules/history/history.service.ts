import { OrderBy } from './history.types';

export const sortWithParams = (words: HistoryData[], orderBy: OrderBy, order: Order): HistoryData[] =>
    [...words].sort((wordA, wordB) => {
        const itemA = orderBy === 'createdAt' ? new Date(wordA[orderBy]).getTime() : wordA[orderBy];
        const itemB = orderBy === 'createdAt' ? new Date(wordB[orderBy]).getTime() : wordB[orderBy];

        const upper = itemA > itemB;
        const lower = itemA < itemB;
        if (upper) {
            return order === 'asc' ? 1 : -1;
        }

        if (lower) {
            return order === 'asc' ? -1 : 1;
        }

        return 0;
    });
