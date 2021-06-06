import { MenuItem, Paper, Select } from '@material-ui/core';
import { selectHistory, useHistoryActions } from '@state/history';
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { BarChart } from './bar-chart/bar-chart.component';
import { LineChart } from './line-chart/line-chart.component';
import { useStyles } from './metrics.styles';
import { ChartType, MetricValue } from './metrics.types';

export const Metrics = memo(() => {
    const { history } = useSelector(selectHistory);
    const { loadHistory } = useHistoryActions();
    const [metricValue, setMetricValue] = useState(MetricValue.RATING);
    const [chartType, setChartType] = useState(ChartType.LINE);
    const classes = useStyles();

    const dataSet = useMemo(
        () =>
            history
                .sort((testA, testB) => new Date(testB.createdAt).getTime() - new Date(testA.createdAt).getTime())
                .map((test) =>
                    metricValue === MetricValue.RATING ? test[metricValue] / test.wordsAmount : test[metricValue]
                ),
        [history, metricValue]
    );

    useEffect(() => {
        loadHistory();
    }, [loadHistory]);

    const handleMetricValueChange = useCallback(({ target: { value } }) => {
        setMetricValue(value);
    }, []);

    const handleChartTypeChange = useCallback(({ target: { value } }) => {
        setChartType(value);
    }, []);

    return (
        <Paper>
            <div style={{ display: 'flex' }}>
                <Select fullWidth variant="outlined" value={chartType} onChange={handleChartTypeChange}>
                    <MenuItem value={ChartType.LINE}>Line</MenuItem>
                    <MenuItem value={ChartType.BAR}>Bar</MenuItem>
                </Select>
                <Select fullWidth variant="outlined" value={metricValue} onChange={handleMetricValueChange}>
                    <MenuItem value={MetricValue.RATING}>Rating</MenuItem>
                    <MenuItem value={MetricValue.WRONGS}>Wrongs</MenuItem>
                    <MenuItem value={MetricValue.SPENDED_TIME}>Spended time</MenuItem>
                </Select>
            </div>
            <div className={classes.metric}>
                {chartType === ChartType.BAR && <BarChart values={dataSet} />}
                {chartType === ChartType.LINE && <LineChart values={dataSet} />}
            </div>
        </Paper>
    );
});
