import React, {Component} from 'react';
import TodoTable from "./TodoTable";
import AppSnackbar from "./AppSnackbar";
import TodoContextProvider from "../contexts/TodoContext";
import Navigation from "./Navigation";
import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    divider: theme.mixins.toolbar,
}));


const Router = () => {
    const classes = useStyles();
        return (
            <div>
                <Navigation />
                <div className={classes.divider} />
                <TodoContextProvider>
                    <TodoTable />
                    <AppSnackbar />
                </TodoContextProvider>
            </div>
        );
}

export default Router;