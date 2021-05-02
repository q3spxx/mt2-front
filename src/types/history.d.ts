interface HistoryData {
    id: number;
    testType: TestType;
    wordsAmount: number;
    rating: number;
    wrongs: number;
    spendedTime: number;
    createdAt: string;
    words: WordData[];
}

interface HistoryParams {
    testType: string;
    wordsAmount: number;
    words: Pick<WordData, 'id' | 'wrongs' | 'rating' | 'spendedTime' | 'variant'>[];
}
