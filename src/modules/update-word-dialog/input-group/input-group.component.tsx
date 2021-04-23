import { TextField, Typography } from '@material-ui/core';
import React, { memo, useCallback } from 'react';
import { Controller } from 'react-hook-form';
import { ControlName } from '../update-word-dialog.types';
import { useStyles } from './input-group.styles';
import { InputGroupProps } from './input-group.types';

export const InputGroup = memo(({ name, control, label }: InputGroupProps) => {
    const classes = useStyles({});

    const renderVariantNameInput = useCallback(
        ({ field }) => <TextField label="Name" variant="outlined" size="small" fullWidth {...field} />,
        []
    );
    const renderVariantTranslateInput = useCallback(
        ({ field }) => <TextField label="Translate" variant="outlined" size="small" fullWidth {...field} />,
        []
    );

    return (
        <div className={classes.group}>
            <Typography variant="subtitle2">{label}</Typography>
            <div className={classes.controls}>
                <Controller
                    name={`${name}.name` as ControlName}
                    defaultValue=""
                    control={control}
                    render={renderVariantNameInput}
                />
                <Controller
                    name={`${name}.translate` as ControlName}
                    defaultValue=""
                    control={control}
                    render={renderVariantTranslateInput}
                />
            </div>
        </div>
    );
});
