import React, { ChangeEvent, useState, useRef, useEffect, memo, useCallback } from 'react';
import { Button, Paper, LinearProgress, Typography, Input, CircularProgress } from '@material-ui/core';
import { AxiosResponse } from 'axios';
import { WordData } from '@common/word';
import { TestProps, TestWord } from './test.types';
import { useStyles } from './test.styles';
import { createHistories, loadWordPack } from './test.resources';
import { getTestWord } from './test.service';

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
    const [totalRating, setTotalRating] = useState(0);
    const [totalWrongs, setTotalWrongs] = useState(0);
    const [amount, setAmount] = useState(0);
    const [spendedTime, setSpendedTime] = useState(new Date());

    const inputRef = useRef<HTMLInputElement>(null);

    const classes = useStyles({});

    useEffect(() => {
        loadWordPack({ limit: maxAmount }).then(({ data }: AxiosResponse<WordData[]>) => {
            const words = data.map((word) => getTestWord(testType, word));

            setTestWords(words);
            setLoading(false);
            setStartTime(new Date().getTime());
            setTestWord(words[0]);
            setAmount(words.length);
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
        setTotalRating(
            rating -
                Math.floor(
                    rating * (Math.log(Math.E + Math.E * Math.min(Math.max(spendedTime.getTime()) / 600000, 1)) - 1)
                )
        );
    }, [answeredWords, startTime, spendedTime]);

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
            }, 2000);
        } else {
            const histories = answeredWords.map(({ id, wrongs, rating }) => ({ wordId: id, wrongs, rating }));
            createHistories({ histories });
            showStatistics();
        }
    }, [testWords, answeredWords, inputRef, showStatistics]);

    const checkAnswer = useCallback((): void => {
        const word = testWords.shift();

        if (testWord && word) {
            const isRight = testWord.word.translate === value;

            if (isRight) {
                const rating = Math.floor(110 / Math.log(word.testWrongs + 3));
                word.wrongs += word.testWrongs;
                word.rating += rating;
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
    }, [answeredWords, changeWord, testWord, testWords, value]);

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
                                disabled={notification}
                                inputProps={{ className: 'test', ref: inputRef }}
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
                        <Typography variant="h6">{`Spended time: ${spendedTime.getMinutes()}m ${spendedTime.getSeconds()}s`}</Typography>
                        <Typography variant="h6">{`Total rating: ${totalRating}`}</Typography>
                        <Typography variant="h6">{`Total wrongs: ${totalWrongs}`}</Typography>
                        <Button onClick={handleDoneButtonClick}>done</Button>
                    </>
                )}
            </Paper>
        </>
    );
});
