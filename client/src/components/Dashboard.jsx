import { TodoList } from "./TodoList";
import { Input } from "./Input";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../context/userContext";


export function Dashboard() {

    const [toDos, setToDos] = useState([]);
    const { setToken } = useContext(UserContext)

    async function handleData() {
        const data = await fetch('http://localhost:4000/user');
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
        <>
            <button className="btn btn-secondary" onClick={logout}>Logout</button>
            <Input handleData={handleData} />
            <TodoList handleData={handleData} toDos={toDos} />
        </>
    )
}