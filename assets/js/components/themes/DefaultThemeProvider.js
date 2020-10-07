import React from 'react';
import {createMuiTheme, CssBaseline, MuiThemeProvider, responsiveFontSizes} from "@material-ui/core";
import {green, red} from "@material-ui/core/colors";

const theme = createMuiTheme({
    palette: {
        type: 'dark',
        secondary: {
            main: red['800']
        },
        primary: green,
    }
})

const responsiveTheme = responsiveFontSizes(theme)

const DefaultThemeProvider = (props) => {
    return (
        <MuiThemeProvider theme={responsiveTheme}>
            <CssBaseline />
            {props.children}
            {/*</CssBaseline>*/}
        </MuiThemeProvider>
    );
};

export default DefaultThemeProvider;