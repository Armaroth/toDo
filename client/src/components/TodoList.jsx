import { useContext, useState } from "react";
import { ToDoContext } from "../context/todoContext";
import './styles/TodoList.css'
import { useToDos } from "../hooks";
import { EditModal } from './EditModal'
import { UserContext } from "../context/userContext";
export function TodoList() {
    const toDos = useToDos().data;
    const { status } = useToDos();


    const [description, setDescription] = useState('');

    const { currentUser } = useContext(UserContext)

    const { deleteMutation, editMutation, postArchivedMutation, checkBoxMutation } = useContext(ToDoContext);

    // console.log(toDos, currentUser)
    async function onClickEdit(description, id) {
        if (!description) return;
        editMutation.mutate({ description, id })
        setDescription('');
    }
    async function onClickDelete(id) {
        await postArchivedMutation.mutate(id);
        deleteMutation.mutate(id);
    }

    async function onCheckBoxChange(toDo) {
        await checkBoxMutation.mutate({ toDo_id: toDo.todo_id, completed: toDo.completed });
        queryCLient.invalidateQueries(['todos'])
    }

    if (status == 'pending' || currentUser !== toDos[0].user_id) {
        return <h1 className="text-center mt-5 bg-light">Loading...</h1>
    }

    return (
        <>
            <div className="container mt-5 ">
                <ul className="list-group">
                    {toDos.length ? toDos.map(
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
                                <button className="btn btn-danger d-inline-block ms-1"
                                    onClick={() => onClickDelete(toDo.todo_id)}>Archive
                                </button>
                            </div>
                        </li>) : <li className="list-group-item">ToDo list empty</li>}
                </ul>
            </div>
        </>
    )
}