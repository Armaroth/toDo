import { TodoList } from "./TodoList";
import { Input } from "./Input";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../context/userContext";
import { ToDoContext } from "../context/toDoContext";
import { fetchWithAuth } from "../auth.helpers";
import { NavLink } from "react-router-dom";
import "./styles/dashboard.css";


export function Dashboard() {
    const x = useContext(ToDoContext);

    const [toDos, setToDos] = useState(x);
    const { setToken } = useContext(UserContext);

    console.log(x)
    async function handleData() {
        const data = await fetchWithAuth('http://localhost:4000/user');
        const result = await data.json();
        setToDos(() => result)
    }

    useEffect(() => {
        handleData();
    }, [])

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

