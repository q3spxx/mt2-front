import { WordData } from '@common/word';

export interface UpdateWordDialogProps {
    word?: WordData;
    isOpen: boolean;
    onClose(): void;
}

export type ControlName =
    | 'type'
    | 'main'
    | 'secondary'
    | 'third'
    | 'main.name'
    | 'main.translate'
    | 'secondary.name'
    | 'secondary.translate'
    | 'third.name'
    | 'third.translate';
