import React, { memo } from 'react';
import { TableCell, Typography } from '@material-ui/core';
import { DictionaryCellProps } from './dictionary-cell.types';
import { useStyles } from './dictionary-cell.styles';

export const DictionaryCell = memo(({ word }: DictionaryCellProps) => {
    const classes = useStyles({});

    return (
        <TableCell>
            {word ? (
                <div className={classes.wordContainer}>
                    <Typography variant="subtitle2">{word.name}</Typography>
                    <Typography variant="caption">{word.translate}</Typography>
                </div>
            ) : (
                <Typography>-</Typography>
            )}
        </TableCell>
    );
});
