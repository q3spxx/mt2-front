import React, { memo, useCallback } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import { useDictionaryActions } from '@state/dictionary';
import { Typography } from '@material-ui/core';
import { DeleteWordDialogProps } from './delete-word-dialog.types';

export const DeleteWordDialog = memo(({ isOpen, word, onClose }: DeleteWordDialogProps) => {
    const { deleteWord } = useDictionaryActions();

    const handleYesButtonClick = useCallback(() => {
        if (word) {
            deleteWord(word.id);
            onClose();
        }
    }, [word, deleteWord, onClose]);

    return (
        <Dialog open={isOpen} onClose={onClose}>
            <DialogTitle>Delete word</DialogTitle>
            <DialogContent>
                <Typography>Do you actually want delete this word?</Typography>
            </DialogContent>
            <DialogActions>
                <Button variant="contained" color="secondary" onClick={handleYesButtonClick}>
                    yes
                </Button>
                <Button variant="outlined" onClick={onClose}>
                    cancel
                </Button>
            </DialogActions>
        </Dialog>
    );
});
