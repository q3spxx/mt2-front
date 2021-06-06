import React, { memo, useCallback, useState } from 'react';
import { Select, MenuItem, Button, Typography, Paper } from '@material-ui/core';
import { TestsProps } from './test-selection.types';
import { useTestsStyles } from './test-selection.styles';
import { WORDS_COUNT } from './test-selection.constants';

export const TestSelection = memo(({ runTest }: TestsProps) => {
    const [count, setCount] = useState(20);
    const [testType, setTestType] = useState<TestType>('en2ru');
    const classes = useTestsStyles({});

    const handleTestTypeChange = useCallback(({ target: { value } }: React.ChangeEvent<{ value: unknown }>): void => {
        setTestType(value as TestType);
    }, []);

    const handleCountChange = useCallback(({ target: { value } }: React.ChangeEvent<{ value: unknown }>): void => {
        setCount(value as number);
    }, []);

    const handleButtonClick = useCallback((): void => {
        runTest(testType, count);
    }, [testType, count, runTest]);

    return (
        <Paper className={classes.container}>
            <Typography variant="subtitle2">Choose test type</Typography>
            <Select fullWidth value={testType} variant="outlined" onChange={handleTestTypeChange}>
                <MenuItem value="en2ru">English to russian</MenuItem>
                <MenuItem value="ru2en">Russian to english</MenuItem>
            </Select>
            <Select fullWidth value={count} variant="outlined" onChange={handleCountChange}>
                {WORDS_COUNT.map((wordsCount) => (
                    <MenuItem key={wordsCount} value={wordsCount}>
                        {wordsCount}
                    </MenuItem>
                ))}
            </Select>
            <Button color="primary" variant="contained" onClick={handleButtonClick}>
                Start test
            </Button>
        </Paper>
    );
});
