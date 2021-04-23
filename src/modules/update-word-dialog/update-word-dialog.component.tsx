import React, { memo, useCallback, useEffect } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import { useForm, useWatch } from 'react-hook-form';
import { useDictionaryActions, WordParams } from '@state/dictionary';
import { UpdateWordDialogProps } from './update-word-dialog.types';
import { useStyles } from './update-word-dialog.styles';
import { SelectGroup } from './select-group/select-group.component';
import { InputGroup } from './input-group/input-group.component';

export const UpdateWordDialog = memo(({ isOpen, word, onClose }: UpdateWordDialogProps) => {
    const { control, unregister, handleSubmit } = useForm({
        defaultValues: {
            type: word?.type,
            main: word?.main,
            secondary: word?.secondary,
            third: word?.third,
        },
    });

    const { updateWord } = useDictionaryActions();

    const wordType = useWatch({
        control,
        name: 'type',
        defaultValue: word?.type,
    });

    const classes = useStyles({});

    const handleSuccessClick = useCallback(
        (data: WordParams): void => {
            updateWord({ ...data, id: word?.id });
            onClose();
        },
        [updateWord, onClose, word]
    );

    useEffect(() => {
        if (wordType !== 'verb') {
            unregister(['secondary', 'third']);
        }
    }, [wordType, unregister]);

    const handleCancelClick = useCallback((): void => {
        onClose();
    }, [onClose]);

    return (
        <Dialog onClose={handleCancelClick} open={isOpen}>
            <DialogTitle>Edit word</DialogTitle>
            <DialogContent>
                <div className={classes.content}>
                    <SelectGroup control={control} name="type" label="Type" />
                    <InputGroup control={control} name="main" label="Main" />
                    {wordType === 'verb' && (
                        <>
                            <InputGroup control={control} name="secondary" label="Secondary" />
                            <InputGroup control={control} name="third" label="Third" />
                        </>
                    )}
                </div>
            </DialogContent>
            <DialogActions>
                <Button variant="contained" color="primary" onClick={handleSubmit(handleSuccessClick)}>
                    ok
                </Button>
                <Button variant="outlined" onClick={handleCancelClick}>
                    cancel
                </Button>
            </DialogActions>
        </Dialog>
    );
});
