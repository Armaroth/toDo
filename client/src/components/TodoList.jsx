import { useContext, useEffect, useState } from "react";
import { fetchWithAuth } from "../auth.helpers";
import { ToDoContext } from "../context/todoContext";

export function TodoList({ toDos, handleData }) {

    const [description, setDescription] = useState('');
    const { deleteMutation, editMutation } = useContext(ToDoContext);

    async function onClickEdit(description, id) {
        if (!description) return;
        // const response = await fetchWithAuth(`http://localhost:4000/user`, {
        //     method: 'PUT',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({ description, id })
        // })
        // handleData();

        editMutation.mutate({ description, id })
        setDescription('');
    }

    async function onClickDelete(id) {
        deleteMutation.mutate(id);
    }
    return (
        <>
            <div className="container mt-5 ">
                <ul className="list-group">
                    {toDos.length ? toDos.map(
                        toDo => <li className="list-group-item d-flex justify-content-between mt-1"
                            key={toDo.todo_id}>{toDo.description}
                            <div className="align-self-end">
                                <button type="button" className="btn btn-warning d-inline-block ms-1" data-bs-toggle="modal"
                                    data-bs-target={`#modal${toDo.todo_id}`}
                                    onClick={() => setDescription(toDo.description)}>
                                    Edit
                                </button>
                                <div className="modal fade" id={`modal${toDo.todo_id}`} tabIndex="-1"
                                    aria-labelledby="ModalLabel" aria-hidden="true">
                                    <div className="modal-dialog">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h5 className="modal-title" id="ModalLabel">Edit toDo</h5>
                                                <button type="button" className="btn-close" data-bs-dismiss="modal"
                                                    aria-label="Close">
                                                </button>
                                            </div>
                                            <div className="modal-body">
                                                <input className="form-control" value={description}
                                                    onChange={e => setDescription(e.target.value)} type="text" />
                                            </div>
                                            <div className="modal-footer">
                                                <button type="button" className="btn btn-warning" data-bs-dismiss="modal"
                                                    onClick={() => onClickEdit(description, toDo.todo_id)}>Edit
                                                </button>
                                                <button type="button" className="btn btn-danger"
                                                    data-bs-dismiss="modal">Close
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <button className="btn btn-danger d-inline-block ms-1"
                                    onClick={() => onClickDelete(toDo.todo_id)}>Delete</button>
                            </div>
                        </li>) : <li className="list-group-item">ToDo list empty</li>}
                </ul>
            </div>
        </>
    )
}