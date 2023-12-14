import { useContext, useState } from "react";
import './styles/TodoList.css';
import { Todo } from "./Todo";
import { UserContext } from "../context/userContext";
import { useToDos } from '../hooks';

export function TodoList() {
    const { data, status } = useToDos();
    const { currentUser } = useContext(UserContext);
    if (status == 'pending' || (data?.length && currentUser?.id !== data[0]?.user_id)) {
        return <h1 className="text-center mt-5 bg-light">Loading...</h1>
    };
    return (
        <>
            <div className="container mt-5 ">
                <ul className="list-group">
                    {data?.length ? data.map(
                        todo => <Todo key={todo.todo_id} todo={todo} isArchived={false} />) : <li className="list-group-item border border-secondary">ToDo list empty</li>}
                </ul>
            </div>
        </>
    )
}