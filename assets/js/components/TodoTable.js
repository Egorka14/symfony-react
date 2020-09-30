import React, {useContext, useState} from 'react';
import {TodoContext} from "../contexts/TodoContext";
import Table from "@material-ui/core/Table";
import {TableHead, TableRow, TableCell, TableBody, IconButton, TextField} from "@material-ui/core";
import {Delete, Edit, TextFields, Add} from "@material-ui/icons";

function TodoTable() {
        const context = useContext(TodoContext);
        const [addTodo, setAddTodo] = useState('')

        return (
            <form onSubmit={() => {context.createTodo(event, {name: addTodo})}}>
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
                            <TextField value={addTodo} onChange={(event) => {setAddTodo(event.target.value)}} label={"new task"} fullWidth={true} />
                        </TableCell>
                        <TableCell align={"right"}>
                            <IconButton>
                                <Add />
                            </IconButton>
                        </TableCell>
                    </TableRow>
                    {context.todos.slice().reverse().map((todo,index) => (
                        <TableRow key={'todo ' + index}>
                            <TableCell>{todo.name}</TableCell>
                            <TableCell align={"right"}>
                                <IconButton><Edit/></IconButton>
                                <IconButton><Delete/></IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            </form>
        );
}

export default TodoTable;