import { useContext, useState } from "react";
import './styles/TodoList.css'
import { EditModal } from './EditModal'
import { UserContext } from "../context/userContext";

import { useDeleteTodo, useEditTodo, useToDos, useCheckBox, useArchiveTodo } from '../hooks'
export function TodoList() {

    const { data, status } = useToDos()
    const deleteMutation = useDeleteTodo();
    const editMutation = useEditTodo();
    const checkBoxMutation = useCheckBox();
    const archiveMutation = useArchiveTodo();

    async function deleteTodo(id, table) {
        await deleteMutation.mutateAsync({ id, table })
    }

    async function postTodo(id) {
        await archiveMutation.mutateAsync(id)
    }

    const [description, setDescription] = useState('');
    const { currentUser } = useContext(UserContext);

    async function onClickEdit(description, id) {
        if (!description) return;
        editMutation.mutate({ description, id })
        setDescription('');
    }

    async function onClickArchive(id) {
        const table = 'todos';
        await postTodo(id).then(() => {
            deleteTodo(id, table)
        })

    }

    async function onCheckBoxChange(toDo) {
        checkBoxMutation.mutate({ toDo_id: toDo.todo_id, completed: toDo.completed });
    }

    if (status == 'pending' || currentUser.id !== data[0].user_id) {
        return <h1 className="text-center mt-5 bg-light">Loading...</h1>
    }

    return (
        <>
            <div className="container mt-5 ">
                <ul className="list-group">
                    {data?.length ? data.map(
                        toDo => <li className="list-group-item d-flex justify-content-between my-1"
                            key={toDo.todo_id}>{toDo.description}
                            {/* check box */}
                            <div className="align-self-end d-flex">
                                <div className="form-check my-2">
                                    <input className="form-check-input" type="checkbox" checked={toDo.completed}
                                        onChange={() => onCheckBoxChange(toDo)} id="flexCheckDefault" />
                                </div>

                                <EditModal toDo={toDo} />
                                {/* archive button */}
                                <button disabled={archiveMutation.status === 'pending' || deleteMutation.status === 'pending'} className="btn btn-danger d-inline-block ms-1"
                                    onClick={async () => await onClickArchive(toDo.todo_id)}>Archive
                                </button>
                            </div>
                        </li>) : <li className="list-group-item">ToDo list empty</li>}
                </ul>
            </div>
        </>
    )
}