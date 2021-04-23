import React, { memo } from 'react';
import { Provider } from 'react-redux';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core';
import { createStore } from './state/store';
import { Main } from './modules/main';
import { appTheme } from './app.styles';

export const theme = createMuiTheme(appTheme);

const store = createStore();

export const App = memo(() => (
    <Provider store={store}>
        <MuiThemeProvider theme={theme}>
            <Main />
        </MuiThemeProvider>
    </Provider>
));
