import { WordData } from '@common/word';

export interface DeleteWordDialogProps {
    isOpen: boolean;
    word?: WordData;
    onClose(): void;
}
