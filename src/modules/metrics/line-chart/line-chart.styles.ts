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
    point: {
        cursor: 'pointer',
        fill: 'steelblue',
        textAnchor: 'middle',
        opacity: 0,
        transition: 'opacity .2s ease',
        '&:hover': {
            opacity: 1,
        },
    },
    text: {
        transform: 'translate(0px, -16px)',
        fontFamily: 'sans-serif',
        fill: 'black',
        fontWeight: 700,
    },
});
