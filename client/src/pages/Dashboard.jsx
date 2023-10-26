import { TodoList } from "../components/TodoList";
import { Input } from "../components/Input";
import { useEffect, useContext } from "react";
import { UserContext } from "../context/userContext";
import { ToDoContext } from "../context/toDoContext";
import "./styles/dashboard.css";
import { useQueryClient } from "@tanstack/react-query";
import { decodeJwt } from "../auth.helpers";


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
            <div className="d-flex justify-content-end nav py-2 ">
                <h1 className="mx-3 mt-1 h4"> Current User: {currentUser}</h1>
                <button className="btn" onClick={logout}>Logout</button>
            </div>
            <div id="list" className="container">
                <Input handleData={handleData} />
                <TodoList handleData={handleData} toDos={toDos} />
            </div>
        </div>
    )
}

