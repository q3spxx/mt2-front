import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles({
    metric: {
        height: 800,
        margin: '24px',
    },
});

export const useAxisStyles = makeStyles({
    axisX: {
        '& text': {
            transform: 'rotateZ(315deg)',
            transformOrigin: '10px 12px',
        },
    },
});
