import React, {Fragment, useContext, useState} from 'react';
import {TodoContext} from "../contexts/TodoContext";
import Table from "@material-ui/core/Table";
import {TableHead, TableRow, TableCell, TableBody, IconButton, TextField, InputAdornment} from "@material-ui/core";
import {Delete, Edit, TextFields, Add, Done, Cancel, Close} from "@material-ui/icons";
import DeleteDialog from "./DeleteDialog";

function TodoTable() {
    const context = useContext(TodoContext);
    const [addTodo, setAddTodo] = useState('');
    const [editIsShown, setEditIsShown] = useState(false);
    const [editTodo, setEditTodo] = useState('');
    const [deleteConfirmationIsShown, setDeleteConfirmationIsShown] = useState(false);
    const [todoToBeDeleted, setTodoToBeDeleted] = useState(null);

        return (
            <Fragment>
                <form onSubmit={() => {
                    context.createTodo(event, addTodo);
                    setAddTodo('');
                }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Task</TableCell>
                            <TableCell align={"right"}>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell>
                                <TextField
                                    value={addTodo}
                                    onChange={(event) => {
                                        setAddTodo(event.target.value);
                                    }}
                                    label={"new task"}
                                    fullWidth={true}
                                />
                            </TableCell>
                            <TableCell align={"right"}>
                                <IconButton onClick={() => {
                                    context.createTodo(event, addTodo);
                                    setAddTodo('');
                                }}>
                                    <Add />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                        {context.todos.slice().reverse().map((todo,index) => (
                            <TableRow key={'todo ' + index}>
                                <TableCell>
                                    {editIsShown === todo.id ?
                                        <TextField
                                            fullWidth={true}
                                            value={editTodo}
                                            onChange={(event) => {
                                                setEditTodo(event.target.value)
                                            }}
                                            InputProps= {{
                                                endAdornment: <Fragment>
                                                    <IconButton onClick={() => {
                                                        context.updateTodo({id: todo.id, name: editTodo})
                                                        setEditIsShown(false);
                                                    }}
                                                    ><Done/>
                                                    </IconButton>
                                                    <IconButton onClick={() => {setEditIsShown(false)}}><Close/></IconButton>
                                                </Fragment>
                                            }}
                                        /> : todo.name
                                    }
                                </TableCell>
                                <TableCell align={"right"}>
                                    <IconButton onClick={() => {
                                        setEditIsShown(todo.id);
                                        setEditTodo(todo.name);
                                    }}>
                                        <Edit/>
                                    </IconButton>

                                    <IconButton onClick={() => {
                                        setDeleteConfirmationIsShown(true);
                                        setTodoToBeDeleted(todo);
                                    }}>
                                        <Delete/>
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                </form>

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