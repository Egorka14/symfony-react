import React, {createContext} from 'react';
import axios from 'axios';
import request from "../request";
import config from "../Config";

export const TodoContext = createContext()

const ApiUrl = ()=> {
    return config.apiUrl;
};

const ApiTodo = ()=> {
    return config.apiTodo;
};

class TodoContextProvider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            todos: [],
            message: {},
        };
        this.readTodo();
    }


    isEmpty(str) {
        if (str.trim() === '') return false;

        return true;
    }

    //create
    createTodo(event, todoTitle, todoDescription) {
        event.preventDefault();

            axios.post(ApiUrl() + ApiTodo() +'/create', {task: todoTitle, description: todoDescription})
                .then(response => {
                    if (response.data.message.level === 'success') {
                        let data = [...this.state.todos];
                        data.push(response.data.todo);
                        this.setState({
                            todos:data,
                            message: response.data.message,
                        })
                    } else {
                        this.setState({
                            message: response.data.message,
                        })
                    }
                }).catch(error => {
                console.log(error);
            })
    }

    //read
    readTodo() {
        axios.get(ApiUrl() + ApiTodo() + '/read')
            .then(response => {
                this.setState({
                    todos: response.data,
                })
            }).catch(error => {
                console.error(error)
        })
    }

    //update
    updateTodo(data) {

        axios.put(ApiUrl() + ApiTodo() + '/update/' + data.id, data)
            .then(response => {
                if (response.data.message.level === 'error') {
                    this.setState({
                        message: response.data.message,
                    })
                } else {
                    console.log(response.data.message);
                    let todos = [
                        ...this.state.todos
                    ]
                    let todo = todos.find(todo => {
                        return todo.id === data.id
                    })

                    todo.task = data.task;
                    todo.description = data.description;

                    this.setState({
                        todos: todos,
                        message: response.data.message,
                    })
                }

            }).catch(error => {
            console.error(error);
        })


    }

    //delete
    deleteTodo(id) {
        axios.delete(ApiUrl() + ApiTodo() + '/delete/' + id)
            .then(response => {
                if (response.data.message.level === 'error') {
                    this.setState({
                        message: response.data.message,
                    })
                } else {
                    console.log(response.data.message);
                    let todos = [
                        ...this.state.todos
                    ]
                    this.setState({
                        todos: todos.filter(todo => todo.id !== id),
                        message: response.data.message,
                    })
                }

            }).catch(error => {
            console.error(error);
        })
    }

    render() {
        return (
            <TodoContext.Provider value={{
                ...this.state,
                createTodo: this.createTodo.bind(this),
                updateTodo: this.updateTodo.bind(this),
                deleteTodo: this.deleteTodo.bind(this),
                setMessage: (message) => this.setState({message: message}),
            }}>
                { this.props.children }
            </TodoContext.Provider>
        )
    }
}

export default TodoContextProvider;