import {
    LinearProgress,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TableSortLabel,
    Typography,
} from '@material-ui/core';
import { selectHistory, useHistoryActions } from '@state/history';
import React, { memo, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { HistoryModal } from './history-modal/history-modal.component';
import { sortWithParams } from './history.service';
import { OrderBy } from './history.types';

export const History = memo(() => {
    const { loadHistory } = useHistoryActions();
    const { history, loading } = useSelector(selectHistory);
    const [orderBy, setOrderBy] = useState<OrderBy>('createdAt');
    const [order, setOrder] = useState<Order>('desc');

    const items = useMemo(() => sortWithParams(history, orderBy, order), [history, orderBy, order]);

    useEffect(() => {
        loadHistory();
    }, [loadHistory]);

    const handleSortClick = (name: OrderBy) => (): void => {
        if (name === orderBy) {
            setOrder(order === 'asc' ? 'desc' : 'asc');
        } else {
            setOrderBy(name);
        }
    };

    if (loading) {
        return <LinearProgress />;
    }

    return (
        <Paper>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell sortDirection="asc">
                            <TableSortLabel
                                active={orderBy === 'testType'}
                                direction={order}
                                onClick={handleSortClick('testType')}
                            >
                                <Typography variant="subtitle2">Test type</Typography>
                            </TableSortLabel>
                        </TableCell>
                        <TableCell>
                            <TableSortLabel
                                active={orderBy === 'wordsAmount'}
                                direction={order}
                                onClick={handleSortClick('wordsAmount')}
                            >
                                <Typography variant="subtitle2">Words amount</Typography>
                            </TableSortLabel>
                        </TableCell>
                        <TableCell>
                            <TableSortLabel
                                active={orderBy === 'wrongs'}
                                direction={order}
                                onClick={handleSortClick('wrongs')}
                            >
                                <Typography variant="subtitle2">Wrongs</Typography>
                            </TableSortLabel>
                        </TableCell>
                        <TableCell>
                            <TableSortLabel
                                active={orderBy === 'rating'}
                                direction={order}
                                onClick={handleSortClick('rating')}
                            >
                                <Typography variant="subtitle2">Average rating</Typography>
                            </TableSortLabel>
                        </TableCell>
                        <TableCell>
                            <TableSortLabel
                                active={orderBy === 'spendedTime'}
                                direction={order}
                                onClick={handleSortClick('spendedTime')}
                            >
                                <Typography variant="subtitle2">Spended time</Typography>
                            </TableSortLabel>
                        </TableCell>
                        <TableCell>
                            <TableSortLabel
                                active={orderBy === 'createdAt'}
                                direction={order}
                                onClick={handleSortClick('createdAt')}
                            >
                                <Typography variant="subtitle2">Date</Typography>
                            </TableSortLabel>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {items.map((test) => (
                        <HistoryModal key={test.id} test={test} />
                    ))}
                </TableBody>
            </Table>
        </Paper>
    );
});
