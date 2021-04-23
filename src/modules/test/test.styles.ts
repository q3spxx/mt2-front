import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles({
    container: {
        textAlign: 'center',
        padding: 18,
    },
    testContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: 270,
    },
    ui: {
        display: 'flex',
        flexDirection: 'column',
        width: 300,
    },
    notification: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: 50,
        margin: '48px 0',
    },
    word: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        width: 300,
        margin: '36px 0',
    },
    testWord: {
        textAlign: 'center',
    },
    right: {
        color: '#56b14c',
    },
    wrong: {
        color: '#d85454',
    },
    progress: {
        width: '100%',
    },
    answer: {
        marginTop: 8,
    },
});
