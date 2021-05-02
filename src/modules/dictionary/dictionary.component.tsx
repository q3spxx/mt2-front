import React, { memo, ReactElement, useCallback, useEffect, useMemo, useState } from 'react';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Typography from '@material-ui/core/Typography';
import TableBody from '@material-ui/core/TableBody';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import { IconButton, LinearProgress } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import { selectDictionary, useDictionaryActions } from '@state/dictionary';
import { useSelector } from 'react-redux';
import { Order, OrderBy } from './dictionary.types';
import { AddWordDialog } from '../add-word-dialog';
import { DeleteWordDialog } from '../delete-word-dialog';
import { UpdateWordDialog } from '../update-word-dialog';
import { sortWithParams } from './dictionary.service';
import { DictionaryCell } from './dictionary-cell/dictionary-cell.component';

export const Dictionary = memo(
    (): ReactElement => {
        const [addModalIsOpen, setAddModalIsOpen] = useState(false);
        const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
        const [updateModalIsOpen, setUpdateModalIsOpen] = useState(false);
        const [orderBy, setOrderBy] = useState<OrderBy>('rating');
        const [order, setOrder] = useState<Order>('desc');
        const [currentWord, setCurrentWord] = useState<WordData>();
        const { words, loading } = useSelector(selectDictionary);

        const { loadWords } = useDictionaryActions();

        useEffect(() => {
            loadWords();
        }, [loadWords]);

        const dictionary = useMemo(() => sortWithParams(words, orderBy, order), [words, order, orderBy]);

        const handleSortClick = (name: OrderBy) => (): void => {
            const newOrder = order === 'asc' ? 'desc' : 'asc';

            setOrderBy(name);
            setOrder(name === orderBy ? newOrder : 'asc');
        };

        const handleAddButtonClick = useCallback((): void => {
            setAddModalIsOpen(true);
        }, []);

        const closeAddWordDialog = useCallback((): void => {
            setAddModalIsOpen(false);
        }, []);

        const handleDeleteButtonClick = (word: WordData) => (): void => {
            setCurrentWord(word);
            setDeleteModalIsOpen(true);
        };

        const closeDeleteWordDialog = useCallback((): void => {
            setDeleteModalIsOpen(false);
        }, []);

        const handleUpdateButtonClick = (word: WordData) => (): void => {
            setCurrentWord(word);
            setUpdateModalIsOpen(true);
        };

        const closeUpdateWordDialog = useCallback((): void => {
            setUpdateModalIsOpen(false);
        }, []);

        if (loading) {
            return <LinearProgress />;
        }

        return (
            <>
                {addModalIsOpen && <AddWordDialog isOpen={addModalIsOpen} onClose={closeAddWordDialog} />}
                <DeleteWordDialog isOpen={deleteModalIsOpen} word={currentWord} onClose={closeDeleteWordDialog} />
                {updateModalIsOpen && (
                    <UpdateWordDialog isOpen={updateModalIsOpen} word={currentWord} onClose={closeUpdateWordDialog} />
                )}
                <Button variant="contained" color="primary" onClick={handleAddButtonClick}>
                    Add
                </Button>
                <Paper>
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell sortDirection="asc">
                                    <TableSortLabel
                                        active={orderBy === 'main'}
                                        direction={orderBy === 'main' ? order : 'asc'}
                                        onClick={handleSortClick('main')}
                                    >
                                        <Typography variant="subtitle2">Main</Typography>
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="subtitle2">Secondary</Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="subtitle2">Third</Typography>
                                </TableCell>
                                <TableCell align="right">
                                    <TableSortLabel
                                        active={orderBy === 'type'}
                                        direction={orderBy === 'type' ? order : 'asc'}
                                        onClick={handleSortClick('type')}
                                    >
                                        <Typography variant="subtitle2">Type</Typography>
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell align="right">
                                    <TableSortLabel
                                        active={orderBy === 'rating'}
                                        direction={orderBy === 'rating' ? order : 'asc'}
                                        onClick={handleSortClick('rating')}
                                    >
                                        <Typography variant="subtitle2">Rating</Typography>
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell align="right">
                                    <Typography variant="subtitle2">Actions</Typography>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {dictionary.map((word) => {
                                const { id, main, secondary, third, rating, type } = word;

                                return (
                                    <TableRow key={id}>
                                        <DictionaryCell word={main} />
                                        <DictionaryCell word={secondary} />
                                        <DictionaryCell word={third} />
                                        <TableCell align="right">
                                            <Typography variant="caption">{type}</Typography>
                                        </TableCell>
                                        <TableCell align="right">
                                            <Typography variant="caption">{rating}</Typography>
                                        </TableCell>
                                        <TableCell align="right">
                                            <IconButton size="small" onClick={handleUpdateButtonClick(word)}>
                                                <EditIcon fontSize="small"></EditIcon>
                                            </IconButton>
                                            <IconButton size="small" onClick={handleDeleteButtonClick(word)}>
                                                <DeleteIcon fontSize="small"></DeleteIcon>
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </Paper>
            </>
        );
    }
);
