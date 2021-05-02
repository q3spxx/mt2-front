import { LinearProgress, Paper, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@material-ui/core';
import { selectHistory, useHistoryActions } from '@state/history';
import React, { memo, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { HistoryModal } from './history-modal/history-modal.component';

export const History = memo(() => {
    const { loadHistory } = useHistoryActions();
    const { history, loading } = useSelector(selectHistory);

    useEffect(() => {
        loadHistory();
    }, [loadHistory]);

    if (loading) {
        return <LinearProgress />;
    }

    return (
        <Paper>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell sortDirection="asc">
                            <Typography variant="subtitle2">Test type</Typography>
                        </TableCell>
                        <TableCell>
                            <Typography variant="subtitle2">Words amount</Typography>
                        </TableCell>
                        <TableCell>
                            <Typography variant="subtitle2">Wrongs</Typography>
                        </TableCell>
                        <TableCell>
                            <Typography variant="subtitle2">Average rating</Typography>
                        </TableCell>
                        <TableCell>
                            <Typography variant="subtitle2">Spended time</Typography>
                        </TableCell>
                        <TableCell>
                            <Typography variant="subtitle2">Date</Typography>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {history.map((test) => (
                        <HistoryModal key={test.id} test={test} />
                    ))}
                </TableBody>
            </Table>
        </Paper>
    );
});
