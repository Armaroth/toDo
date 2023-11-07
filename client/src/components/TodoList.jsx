import { useContext, useState } from "react";
import { ToDoContext } from "../context/todoContext";
import './styles/TodoList.css'
export function TodoList({ toDos }) {
    const { status, isFetching } = useContext(ToDoContext)
    const [description, setDescription] = useState('');
    const { deleteMutation, editMutation, postArchivedMutation } = useContext(ToDoContext);
    async function onClickEdit(description, id) {
        if (!description) return;
        editMutation.mutate({ description, id })
        setDescription('');
    }
    async function onClickDelete(id) {
        postArchivedMutation.mutate(id);
        deleteMutation.mutate(id);
    }

    if (status == 'pending' || isFetching) {
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
                                <div class="form-check my-2">
                                    <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                </div>

                                {/* edit button */}
                                <button type="button" className="btn btn-warning d-inline-block " data-bs-toggle="modal"
                                    data-bs-target={`#modal${toDo.todo_id}`}
                                    onClick={() => setDescription(toDo.description)}>
                                    Edit
                                </button>
                                {/* edit modal */}
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