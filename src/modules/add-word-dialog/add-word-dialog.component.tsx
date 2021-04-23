import React, { memo, useCallback, useEffect } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import { useForm, useWatch } from 'react-hook-form';
import { useDictionaryActions, WordParams } from '@state/dictionary';
import { AddWordDialogProps } from './add-word-dialog.types';
import { InputGroup } from './input-group/input-group.component';
import { useStyles } from './add-word-dialog.styles';
import { SelectGroup } from './select-group/select-group.component';

export const AddWordDialog = memo(({ isOpen, onClose }: AddWordDialogProps) => {
    const { control, unregister, handleSubmit } = useForm();
    const { createWord } = useDictionaryActions();

    const wordType = useWatch({
        control,
        name: 'type',
        defaultValue: 'noun',
    });

    const classes = useStyles({});

    const handleSuccessClick = useCallback(
        (data: WordParams): void => {
            createWord(data);
            onClose();
        },
        [createWord, onClose]
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
            <DialogTitle>Add word</DialogTitle>
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
