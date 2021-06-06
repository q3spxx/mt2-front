import React, { ChangeEvent, useState, useCallback, memo } from 'react';
import Tabs from '@material-ui/core/Tabs/Tabs';
import Tab from '@material-ui/core/Tab/Tab';
import { Dictionary } from '../dictionary';
import { History } from '../history';
import { TestSelection } from '../test-selection';
import { Test } from '../test';
import { MainTab } from './main.types';
import { Metrics } from '../metrics';

export const Main = memo(() => {
    const [tab, setTab] = useState(MainTab.METRICS);
    const [testType, setTestType] = useState<TestType>();
    const [maxAmount, setMaxAmount] = useState<number>();

    const handleTabsChange = useCallback((_: ChangeEvent<Record<string, unknown>>, value: MainTab): void => {
        setTab(value);
    }, []);

    const handleRunTest = useCallback((type: TestType, amount: number): void => {
        setTestType(type);
        setMaxAmount(amount);
    }, []);

    const handleFinishTest = useCallback((): void => {
        setTestType(undefined);
        setMaxAmount(undefined);
    }, []);

    return testType && maxAmount ? (
        <Test maxAmount={maxAmount} testType={testType} finishTest={handleFinishTest} />
    ) : (
        <>
            <Tabs variant="fullWidth" value={tab} onChange={handleTabsChange}>
                <Tab label="tests" />
                <Tab label="dictionary" />
                <Tab label="history" />
                <Tab label="metrics" />
            </Tabs>
            {tab === MainTab.TEST_SELECTION && <TestSelection runTest={handleRunTest} />}
            {tab === MainTab.DICTIONARY && <Dictionary />}
            {tab === MainTab.HISTORY && <History />}
            {tab === MainTab.METRICS && <Metrics />}
        </>
    );
});
