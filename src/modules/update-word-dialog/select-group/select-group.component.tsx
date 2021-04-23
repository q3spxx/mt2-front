import { MenuItem, Select, Typography } from '@material-ui/core';
import React, { memo, useCallback } from 'react';
import { Controller } from 'react-hook-form';
import { ControlName } from '../update-word-dialog.types';
import { useStyles } from './select-group.styles';
import { SelectGroupProps } from './select-group.types';

export const SelectGroup = memo(({ name, control, label }: SelectGroupProps) => {
    const classes = useStyles({});

    const renderVariantNameInput = useCallback(
        ({ field }) => (
            <Select fullWidth variant="outlined" {...field}>
                <MenuItem value="verb">Verb</MenuItem>
                <MenuItem value="adjective">Adjective</MenuItem>
                <MenuItem value="noun">Noun</MenuItem>
                <MenuItem value="adverb">Adverb</MenuItem>
                <MenuItem value="preposition">Preposition</MenuItem>
                <MenuItem value="сonjunction">Conjunction</MenuItem>
            </Select>
        ),
        []
    );

    return (
        <div className={classes.group}>
            <Typography variant="subtitle2">{label}</Typography>
            <div className={classes.controls}>
                <Controller
                    name={name as ControlName}
                    defaultValue="noun"
                    control={control}
                    render={renderVariantNameInput}
                />
            </div>
        </div>
    );
});
