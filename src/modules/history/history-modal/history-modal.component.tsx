import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TableSortLabel,
    Typography,
} from '@material-ui/core';
import React, { memo, useCallback, useMemo, useState } from 'react';
import { sortWithParams } from './history-modal.service';
import { HistoryModalProps, OrderBy } from './history-modal.types';

export const HistoryModal = memo(
    ({ test: { testType, wordsAmount, words, rating, wrongs, spendedTime, createdAt } }: HistoryModalProps) => {
        const [isOpen, setIsOpen] = useState(false);
        const [orderBy, setOrderBy] = useState<OrderBy>('rating');
        const [order, setOrder] = useState<Order>('desc');

        const items = useMemo(() => sortWithParams(words, orderBy, order), [words, orderBy, order]);

        const handleClose = useCallback(() => setIsOpen(false), [setIsOpen]);
        const handleOpen = useCallback(() => setIsOpen(true), [setIsOpen]);

        const handleSortClick = (name: OrderBy) => (): void => {
            if (name === orderBy) {
                setOrder(order === 'asc' ? 'desc' : 'asc');
            } else {
                setOrderBy(name);
            }
        };

        return (
            <>
                <TableRow onClick={handleOpen}>
                    <TableCell>{testType}</TableCell>
                    <TableCell>{wordsAmount}</TableCell>
                    <TableCell>{wrongs}</TableCell>
                    <TableCell>{rating / wordsAmount}</TableCell>
                    <TableCell>{new Date(spendedTime).toLocaleTimeString('ru-RU', { timeZone: 'UTC' })}</TableCell>
                    <TableCell>{new Date(createdAt).toLocaleString()}</TableCell>
                </TableRow>
                <Dialog open={isOpen} maxWidth="md" onClose={handleClose}>
                    <DialogTitle>Details</DialogTitle>
                    <DialogContent>
                        <Table size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell sortDirection="asc">
                                        <Typography variant="subtitle2">Word</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <TableSortLabel
                                            active={orderBy === 'type'}
                                            direction={order}
                                            onClick={handleSortClick('type')}
                                        >
                                            <Typography variant="subtitle2">Type</Typography>
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
                                            <Typography variant="subtitle2">Rating</Typography>
                                        </TableSortLabel>
                                    </TableCell>
                                    <TableCell>
                                        <TableSortLabel
                                            active={orderBy === 'spendedTime'}
                                            direction={order}
                                            onClick={handleSortClick('spendedTime')}
                                        >
                                            <Typography noWrap variant="subtitle2">
                                                Spended time (ms)
                                            </Typography>
                                        </TableSortLabel>
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {items.map(({ id, wrongs, rating, spendedTime, type, variant, ...rest }) => (
                                    <TableRow key={id}>
                                        <TableCell>{rest[variant]?.name}</TableCell>
                                        <TableCell>{type}</TableCell>
                                        <TableCell>{wrongs}</TableCell>
                                        <TableCell>{rating}</TableCell>
                                        <TableCell>{spendedTime}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </DialogContent>
                    <DialogActions>
                        <Button variant="outlined" onClick={handleClose}>
                            ok
                        </Button>
                    </DialogActions>
                </Dialog>
            </>
        );
    }
);
