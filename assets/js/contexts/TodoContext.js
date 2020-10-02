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
        };
        this.readTodo();
    }


    isEmpty(str) {
        if (str.trim() === '') return false;

        return true;
    }

    //create
    createTodo(event, todo) {
        event.preventDefault();

        if (this.isEmpty(todo)) {
            axios.post(ApiUrl() + ApiTodo() +'/create', {name: todo})
                .then(response => {
                    console.log(response.data);
                    let data = [...this.state.todos];
                    data.push(response.data.todo);
                    this.setState({
                        todos:data
                    })
                }).catch(error => {
                console.log(error);
            })
        }
    }

    //read
    readTodo() {
        axios.get(ApiUrl() + ApiTodo() + '/read')
            .then(responce => {
                this.setState({
                    todos: responce.data,
                })
            }).catch(error => {
                console.log(error)
        })
    }

    //update
    updateTodo(data) {

        axios.put(ApiUrl() + ApiTodo() + '/update/' + data.id, data)
            .then(response => {
                console.log(response.data.message);
                let todos = [
                    ...this.state.todos
                ]
                let todo = todos.find(todo => {
                    return todo.id === data.id
                })

                todo.name = data.name;

                this.setState({
                    todos: todos
                })
            }).catch(error => {
            console.log(error);
        })


    }

    //delete
    deleteTodo(id) {
        axios.delete(ApiUrl() + ApiTodo() + '/delete/' + id)
            .then(response => {
                console.log(response.data.message);
                let todos = [
                    ...this.state.todos
                ]
                this.setState({
                    todos: todos.filter(todo => todo.id !== id)
                })
            }).catch(error => {
            console.log(error);
        })
    }

    render() {
        return (
            <TodoContext.Provider value={{
                ...this.state,
                createTodo: this.createTodo.bind(this),
                updateTodo: this.updateTodo.bind(this),
                deleteTodo: this.deleteTodo.bind(this),
            }}>
                { this.props.children }
            </TodoContext.Provider>
        )
    }
}

export default TodoContextProvider;