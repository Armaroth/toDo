import { TodoList } from "../components/TodoList";
import { Input } from "../components/Input";
import { ArchivedToDos } from '../components/ArchivedTodos'
import { useEffect, useContext } from "react";
import { UserContext } from "../context/userContext";
import { ToDoContext } from "../context/toDoContext";
import { useQueryClient } from "@tanstack/react-query";
import { decodeJwt } from "../auth.helpers";
import "./styles/dashboard.css";


export function Dashboard() {
    const { data, status, isFetching } = useContext(ToDoContext);
    const { token, currentUser, setCurrentUser, toDos, setToDos, logout } = useContext(UserContext);

    async function handleData() {
        setToDos(() => data)
    }
    const queryCLient = useQueryClient();
    useEffect(() => {
        if (status === 'success' && !isFetching) {
            queryCLient.invalidateQueries(['todos'])
            setCurrentUser(decodeJwt(token).username)
            setToDos(() => data)
        }
    }, [status, data])

    return (
        <div id="dashboard" >
            <div className="d-flex justify-content-end py-2 sticky-top">
                <h1 className="mx-3 mt-1 h4"> Current User: {currentUser}</h1>
                <ArchivedToDos />
                <button className="btn btn-dark d-inline ml-1" onClick={logout}>Logout</button>
            </div>
            <div id="list" className="container">
                <Input handleData={handleData} />
                <TodoList handleData={handleData} toDos={toDos} />
            </div>
        </div>
    )
}

