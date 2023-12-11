import { TodoList } from "../components/TodoList";
import { CreateTodos } from "../components/CreateTodos";
import { ArchivedToDos } from '../components/ArchivedTodos'
import { useEffect, useContext } from "react";
import { UserContext } from "../context/userContext";
import { ToDoContext } from "../context/todoContext";
import { useQueryClient } from "@tanstack/react-query";
import "./styles/dashboard.css";


export function Dashboard() {
    const { data } = useContext(ToDoContext);
    const { token, currentUser, toDos, setToDos, logout } = useContext(UserContext);
    // console.log(currentUser)

    async function handleData() {
        setToDos(() => data)
    }
    const queryCLient = useQueryClient();

    return (
        <div id="dashboard" >
            <div className="d-flex justify-content-end py-2 sticky-top">
                <h1 className="mx-3 mt-1 h4"> Current User: {currentUser.userName}</h1>
                <ArchivedToDos />
                <button className="btn btn-dark d-inline ml-1" onClick={logout}>Logout</button>
            </div>
            <div id="list" className="container">
                <CreateTodos />
                <TodoList toDos={toDos} />
            </div>
        </div>
    )
}

