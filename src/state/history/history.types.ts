export interface HistoryStoreState {
    history: HistoryData[];
    loading: boolean;
}

export interface WordParams {
    id?: number;
    main?: Word;
    secondary?: Word;
    third?: Word;
    type?: WordType;
}

export interface HistoryActions {
    loadHistory(): void;
    createHistory(history: HistoryParams): void;
}
