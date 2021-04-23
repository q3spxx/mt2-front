import { ThemeOptions } from '@material-ui/core/styles/createMuiTheme';

export const appTheme: ThemeOptions = {
    overrides: {
        MuiInputBase: {
            input: {
                '&.test': {
                    textAlign: 'center',
                },
            },
        },
    },
};
