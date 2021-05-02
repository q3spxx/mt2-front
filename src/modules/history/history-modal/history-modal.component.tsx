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
    Typography,
} from '@material-ui/core';
import React, { memo, useCallback, useState } from 'react';
import { HistoryModalProps } from './history-modal.types';

export const HistoryModal = memo(
    ({ test: { testType, wordsAmount, words, rating, wrongs, spendedTime, createdAt } }: HistoryModalProps) => {
        const [isOpen, setIsOpen] = useState(false);

        const handleClose = useCallback(() => setIsOpen(false), [setIsOpen]);
        const handleOpen = useCallback(() => setIsOpen(true), [setIsOpen]);

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
                <Dialog open={isOpen} onClose={handleClose}>
                    <DialogTitle>Details</DialogTitle>
                    <DialogContent>
                        <Table size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell sortDirection="asc">
                                        <Typography variant="subtitle2">Word</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="subtitle2">Type</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="subtitle2">Wrongs</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="subtitle2">Rating</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="subtitle2">Spended time (ms)</Typography>
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {words.map(({ id, wrongs, rating, spendedTime, type, variant, ...rest }) => (
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
