import React, { ChangeEvent, useState, useRef, useEffect, memo, useCallback, useMemo } from 'react';
import { Button, Paper, LinearProgress, Typography, Input, CircularProgress } from '@material-ui/core';
import { AxiosResponse } from 'axios';
import { useHistoryActions } from '@state/history';
import { TestProps, TestWord } from './test.types';
import { useStyles } from './test.styles';
import { loadTestWords } from './test.resources';
import { getTestWord } from './test.service';
import { CHANGE_WORD_TIMEOUT, INPUT_CLASSSES, TEST_TIME_RATING_COEFFICIENT } from './test.constants';

export const Test = memo(({ testType, maxAmount, finishTest }: TestProps) => {
    const [notification, setNotification] = useState(false);
    const [right, setRight] = useState(false);
    const [statistics, setStatistics] = useState(false);
    const [loading, setLoading] = useState(true);
    const [value, setValue] = useState('');
    const [answeredWords, setAnsweredWords] = useState<TestWord[]>([]);
    const [testWords, setTestWords] = useState<TestWord[]>([]);
    const [testWord, setTestWord] = useState<TestWord>();
    const [startTime, setStartTime] = useState(0);
    const [startWordTime, setStartWordTime] = useState(0);
    const [totalRating, setTotalRating] = useState(0);
    const [totalWrongs, setTotalWrongs] = useState(0);
    const [amount, setAmount] = useState(0);
    const [spendedTime, setSpendedTime] = useState(new Date());

    const { createHistory } = useHistoryActions();

    const inputRef = useRef<HTMLInputElement>(null);

    const classes = useStyles({});

    useEffect(() => {
        loadTestWords({ limit: maxAmount }).then(({ data }: AxiosResponse<WordData[]>) => {
            const words = data.map((word) => getTestWord(testType, word));

            setTestWords(words);
            setLoading(false);
            setStartTime(new Date().getTime());
            setTestWord(words[0]);
            setAmount(words.length);
            setStartWordTime(new Date().getTime());
        });
    }, [maxAmount, testType]);

    const handleBackButtonClick = useCallback((): void => {
        finishTest();
    }, [finishTest]);

    const handleInputChange = useCallback(({ target }: ChangeEvent<HTMLInputElement>): void => {
        setValue(target.value);
    }, []);

    const showStatistics = useCallback((): void => {
        const { rating, wrongs } = answeredWords.reduce(
            (total, { testWrongs, testRating }) => {
                return { rating: total.rating + testRating, wrongs: total.wrongs + testWrongs };
            },
            { rating: 0, wrongs: 0 }
        );

        const time = new Date(new Date().getTime() - startTime);

        setStatistics(true);
        setSpendedTime(time);
        setTotalWrongs(wrongs);
        setTotalRating(rating / answeredWords.length);
    }, [answeredWords, startTime]);

    const changeWord = useCallback((): void => {
        if (testWords.length !== 0) {
            setTimeout(() => {
                setTimeout(() => {
                    if (inputRef.current) {
                        inputRef.current.focus();
                    }
                });
                setNotification(false);
                setTestWord(testWords[0]);
                setTestWords(testWords);
                setValue('');
                setStartWordTime(new Date().getTime());
            }, CHANGE_WORD_TIMEOUT);
        } else {
            const words = answeredWords.map(({ id, wrongs, rating, spendedTime, variant }) => ({
                id,
                wrongs,
                rating,
                spendedTime,
                variant,
            }));
            createHistory({ testType, wordsAmount: maxAmount, words });
            showStatistics();
        }
    }, [testWords, answeredWords, inputRef, showStatistics, testType, maxAmount, createHistory]);

    const checkAnswer = useCallback((): void => {
        const word = testWords.shift();

        if (testWord && word) {
            const isRight = testWord.word.translate === value;

            word.spendedTime += new Date().getTime() - startWordTime;

            if (isRight) {
                const rating = Math.floor(
                    100 -
                        100 *
                            Math.min(
                                Math.log2(
                                    word.testWrongs +
                                        Math.max(
                                            (word.spendedTime / TEST_TIME_RATING_COEFFICIENT) *
                                                ((8 - word.testWrongs) / 8),
                                            1
                                        )
                                ) / 3,
                                1
                            )
                );
                word.wrongs = word.testWrongs;
                word.rating = rating;
                word.testRating = rating;
                answeredWords.push(word);
            } else {
                word.testWrongs += 1;
                testWords.push(word);
            }

            setNotification(true);
            setRight(isRight);
            setTestWords(testWords);
            setAnsweredWords(answeredWords);
        }

        changeWord();
    }, [answeredWords, changeWord, testWord, testWords, value, startWordTime]);

    const handleInputKeyDown = useCallback(
        (event: React.KeyboardEvent<HTMLInputElement>): void => {
            if (event.keyCode === 13) {
                checkAnswer();
            }
        },
        [checkAnswer]
    );

    const handleCheckButton = useCallback((): void => {
        checkAnswer();
    }, [checkAnswer]);

    const handleDoneButtonClick = useCallback((): void => {
        finishTest();
    }, [finishTest]);

    const inputProps = useMemo(() => ({ ref: inputRef }), [inputRef]);

    return (
        <>
            <Button onClick={handleBackButtonClick}>back</Button>
            <Paper className={classes.container}>
                {loading && <CircularProgress />}
                {!!testWords.length && testWord && amount && (
                    <div className={classes.testContainer}>
                        <LinearProgress
                            className={classes.progress}
                            variant="determinate"
                            value={Math.floor(((amount - testWords.length) / amount) * 100)}
                        />
                        <div className={classes.notification}>
                            {notification && (
                                <>
                                    <Typography className={right ? classes.right : classes.wrong} variant="h3">
                                        {right ? 'Right!' : 'Wrong'}
                                    </Typography>
                                    <Typography className={classes.answer} variant="caption">
                                        {`(${testWord.word.translate})`}
                                    </Typography>
                                </>
                            )}
                        </div>
                        <div className={classes.testWord}>
                            <Typography variant="h5">{testWord.word.name}</Typography>
                            <Typography variant="caption">
                                {testWord.type === 'verb' ? `${testWord.type} (${testWord.variant})` : testWord.type}
                            </Typography>
                        </div>
                        <div className={classes.ui}>
                            <Input
                                classes={INPUT_CLASSSES}
                                disabled={notification}
                                inputProps={inputProps}
                                onKeyDown={handleInputKeyDown}
                                value={value}
                                onChange={handleInputChange}
                            />
                            <Button onClick={handleCheckButton}>check</Button>
                        </div>
                    </div>
                )}
                {statistics && (
                    <>
                        <Typography variant="h6">{`Word count: ${answeredWords.length}`}</Typography>
                        <Typography variant="h6">{`Spended time: ${new Date(spendedTime).toLocaleTimeString('ru-RU', {
                            timeZone: 'UTC',
                        })}`}</Typography>
                        <Typography variant="h6">{`Average rating: ${totalRating}`}</Typography>
                        <Typography variant="h6">{`Total wrongs: ${totalWrongs}`}</Typography>
                        <Button onClick={handleDoneButtonClick}>done</Button>
                    </>
                )}
            </Paper>
        </>
    );
});
