import React, {Fragment, useContext, useState} from 'react';
import {TodoContext} from "../contexts/TodoContext";
import Table from "@material-ui/core/Table";
import {TableHead, TableRow, TableCell, TableBody, IconButton, TextField, InputAdornment} from "@material-ui/core";
import {Delete, Edit, TextFields, Add, Done, Cancel, Close} from "@material-ui/icons";
import DeleteDialog from "./DeleteDialog";
import Typography from "@material-ui/core/Typography";

function TodoTable() {
    const context = useContext(TodoContext);
    const [addTodoTitle, setAddTodoTitle] = useState('');
    const [addTodoDescription, setAddTodoDescription] = useState('');
    const [editIsShown, setEditIsShown] = useState(false);
    const [editTodoTitle, setEditTodoTitle] = useState('');
    const [editTodoDescription, setEditTodoDescription] = useState('');
    const [deleteConfirmationIsShown, setDeleteConfirmationIsShown] = useState(false);
    const [todoToBeDeleted, setTodoToBeDeleted] = useState(null);

    const onCreateSubmit = (event) => {
        event.preventDefault();
        context.createTodo(event, addTodoTitle, addTodoDescription);
        setAddTodoTitle('');
        setAddTodoDescription('')
    }
    const onEditSubmit = (todoId, event) => {
        event.preventDefault();
        context.updateTodo({id: todoId, task: editTodoTitle, description: editTodoDescription})
        setEditIsShown(false);
    }

    const clear = () => {
        setEditIsShown(false);
    }

        return (
            <Fragment>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Task</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell align={"right"}>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell>
                                <form onSubmit={onCreateSubmit}>
                                <TextField
                                    type={'text'}
                                    value={addTodoTitle}
                                    onChange={(event) => {
                                        setAddTodoTitle(event.target.value);
                                    }}
                                    label={"New Title"}
                                    fullWidth={true}
                                />
                                </form>
                            </TableCell>
                            <TableCell>
                                <form onSubmit={onCreateSubmit}>
                                    <TextField
                                        type={'text'}
                                        value={addTodoDescription}
                                        onChange={(event) => {
                                            setAddTodoDescription(event.target.value);
                                        }}
                                        label={"Description"}
                                        fullWidth={true}
                                    />
                                </form>
                            </TableCell>
                            <TableCell align={"right"}>
                                <IconButton onClick={onCreateSubmit}>
                                    <Add />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                        {context.todos.slice().reverse().map((todo,index) => (
                            <TableRow key={'todo ' + index}>
                                <TableCell>
                                    {editIsShown === todo.id ?
                                        <TextField
                                            type="text"
                                            fullWidth={true}
                                            autoFocus={true}
                                            value={editTodoTitle}
                                            onChange={(event) => {
                                                setEditTodoTitle(event.target.value)
                                            }}
                                        />
                                        :
                                        <Typography style={{whiteSpace: 'pre-wrap'}}>{todo.task}</Typography>
                                    }
                                </TableCell>
                                <TableCell>
                                    {editIsShown === todo.id ?
                                            <TextField
                                                type="text"
                                                fullWidth={true}
                                                value={editTodoDescription}
                                                onChange={(event) => {
                                                    setEditTodoDescription(event.target.value)
                                                }}
                                                multiline={true}
                                            />
                                        :
                                       <Typography style={{whiteSpace: 'pre-wrap'}}>{todo.description}</Typography>
                                    }
                                </TableCell>
                                <TableCell align={"right"}>
                                    {editIsShown === todo.id ?
                                        <Fragment>
                                            <IconButton type="submit" onClick={onEditSubmit.bind(this, todo.id)}>
                                                <Done/>
                                            </IconButton>
                                            <IconButton onClick={clear}><Close/></IconButton>
                                        </Fragment>
                                        :
                                        <Fragment>
                                        <IconButton onClick={() => {
                                            setEditIsShown(todo.id);
                                            setEditTodoTitle(todo.task);
                                            setEditTodoDescription(todo.description)
                                        }}>
                                            <Edit/>
                                        </IconButton>

                                        <IconButton onClick={() => {
                                        setDeleteConfirmationIsShown(true);
                                        setTodoToBeDeleted(todo);
                                    }}>
                                        <Delete/>
                                        </IconButton>
                                        </Fragment>
                                    }
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>


                {deleteConfirmationIsShown && (
                    <DeleteDialog
                        todo={todoToBeDeleted}
                        open={deleteConfirmationIsShown}
                        setDeleteConfirmationIsShown={setDeleteConfirmationIsShown}
                    />
                )}
            </Fragment>
        );
}

export default TodoTable;