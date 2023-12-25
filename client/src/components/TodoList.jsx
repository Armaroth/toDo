import { useContext, useState } from "react";

import { Todo } from "./Todo";
import { UserContext } from "../context/userContext";
import { useToDos } from '../hooks';

export function TodoList({ darkTheme }) {
    const { data, status } = useToDos();
    const { currentUser } = useContext(UserContext);
    if (status === 'pending' || (data?.length && currentUser?.id !== data[0]?.user_id)) {
        return <h1 className="text-center mt-5 bg-light">Loading...</h1>
    };
    return (
        <>
            <div className="container mt-5 ">
                <ul className="list-group">
                    {data?.length ? data.map(
                        todo => <Todo darkTheme={darkTheme} key={todo.todo_id} todo={todo} isArchived={false} />) : <li key={0} className="list-group-item border border-secondary">ToDo list empty</li>}
                </ul>
            </div>
        </>
    )
}