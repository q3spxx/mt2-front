import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles({
    root: {
        width: '100%',
        height: '100%',
    },
    axisX: {
        '& text': {
            transform: 'rotateZ(315deg)',
            transformOrigin: '10px 12px',
        },
    },
    bar: {
        transition: 'height 0.5s ease',
    },
});
