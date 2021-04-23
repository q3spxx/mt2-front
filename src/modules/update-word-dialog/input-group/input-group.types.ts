import { Control } from 'react-hook-form';

export interface InputGroupProps {
    name: string;
    control: Control<{
        type: WordType | undefined;
        main: Word | undefined;
        secondary: Word | undefined;
        third: Word | undefined;
    }>;
    label: string;
}
