import { TodoList } from "./TodoList";
import { Input } from "./Input";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../context/userContext";
import { ToDoContext } from "../context/toDoContext";
import { NavLink } from "react-router-dom";
import "./styles/dashboard.css";
import { useQueryClient } from "@tanstack/react-query";


export function Dashboard() {
    const { data, status, isFetching } = useContext(ToDoContext);
    // console.log(data, status, isFetching)
    const [toDos, setToDos] = useState([]);
    const { setToken } = useContext(UserContext);


    async function handleData() {
        setToDos(() => data)
    }
    const queryCLient = useQueryClient();
    useEffect(() => {
        if (status === 'success' && !isFetching) {
            queryCLient.invalidateQueries(['todos'])
            setToDos(() => data)
        }

    }, [status, data])

    async function logout() {
        localStorage.removeItem('token')
        setToken('');
    }





    return (

        <div id="dashboard" >
            <NavLink>
                <button className="btn btn-secondary" onClick={logout}>Logout</button>
            </NavLink>
            <div id="list" className="container">
                <Input handleData={handleData} />
                <TodoList handleData={handleData} toDos={toDos} />
            </div>
        </div>
    )
}

