export interface HistoryModalProps {
    test: HistoryData;
}

export type OrderBy = keyof Pick<WordData, 'rating' | 'type' | 'main' | 'spendedTime' | 'wrongs'>;
