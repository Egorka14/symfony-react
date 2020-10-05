import React, {useContext} from 'react';
import PropTypes from 'prop-types'
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import {Button} from "@material-ui/core";
import {TodoContext} from "../contexts/TodoContext";

function DeleteDialog(props) {
    const hide = () => {
        props.setDeleteConfirmationIsShown(false)
    }

    const context = useContext(TodoContext);
        return (
            <Dialog onClose={hide} fullWidth={true} maxWidth={"sm"} open={props.open}>
                <DialogTitle>Are you sure you wish to delete this to-do?</DialogTitle>
                <DialogContent>
                    {props.todo.task}
                </DialogContent>
                <DialogActions>
                    <Button onClick={hide}>Cancel</Button>
                    <Button onClick={() => {
                        context.deleteTodo(props.todo.id);
                        hide();
                    }}>Delete</Button>
                </DialogActions>
            </Dialog>
        );
}

DeleteDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    setDeleteConfirmationIsShown: PropTypes.func.isRequired,
    todo: PropTypes.shape({
        id: PropTypes.number.isRequired,
        task: PropTypes.string.isRequired,
    }),
}

export default DeleteDialog;