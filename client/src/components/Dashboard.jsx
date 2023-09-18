import { TodoList } from "./TodoList";
import { Input } from "./Input";
import { useState, useEffect } from "react";


export function Dashboard() {

    const [toDos, setToDos] = useState([]);

    async function handleData() {
        const data = await fetch('http://localhost:4000/');
        const result = await data.json();
        setToDos(() => result)
    }

    useEffect(() => {
        handleData();
    }, [])





    return (
        <>
            <Input handleData={handleData} />
            <TodoList handleData={handleData} toDos={toDos} />
        </>
    )
}