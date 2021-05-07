export type OrderBy = keyof Pick<
    HistoryData,
    'rating' | 'spendedTime' | 'wrongs' | 'testType' | 'wordsAmount' | 'createdAt'
>;
