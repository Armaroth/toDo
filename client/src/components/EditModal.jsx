import { useState, useRef, useContext } from "react";
import './styles/TodoList.css'
import { useEditTodo } from "../hooks";
export function EditModal({ toDo }) {

    const [description, setDescription] = useState('');
    const inputRef = useRef();
    const editMutation = useEditTodo();
    async function onClickEdit(description, id) {
        if (!description) return;
        editMutation.mutate({ description, id })
        setDescription('');
    }
    return (
        <>
            {/* edit button */}
            <button type="button" className="btn btn-warning d-inline-block border-secondary px-4" data-bs-toggle="modal"
                data-bs-target={`#modal${toDo.todo_id}`}
                onClick={() => {

                    setDescription(toDo.description);
                    inputRef.current.focus();
                }}>
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
                            <input ref={inputRef} className="form-control shadow-none border border-secondary p-1 m-0" value={description}
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

        </>
    )

}
