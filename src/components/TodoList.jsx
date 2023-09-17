import { useEffect, useState } from "react";
import './dashboard.css';

export function TodoList({ toDos, handleData }) {

    const [description, setDescription] = useState('');


    async function onClickEdit(description, id, value) {
        if (!description || description === value) {
            return
        }

        const response = await fetch(`http://localhost:4000/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ description, id })
        })
        handleData();
        setDescription('');
    }
    async function onClickDelete(id) {

        const response = await fetch(`http://localhost:4000/`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id })
        })
        handleData();
    }

    return (
        <>
            <div className="container mt-5 ">
                <ul className="list-group">

                    {toDos.length ? toDos.map(
                        toDo => <li className="list-group-item d-flex justify-content-between mt-1" key={toDo.todo_id}>{toDo.description}
                            <div className="align-self-end">
                                <button type="button" className="btn btn-warning d-inline-block ms-1" data-bs-toggle="modal" data-bs-target="#exampleModal"
                                    onClick={() => setDescription(toDo.description)}>
                                    Edit
                                </button>
                                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                    <div className="modal-dialog">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h5 className="modal-title" id="exampleModalLabel">Edit toDo</h5>
                                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                            </div>
                                            <div className="modal-body">
                                                <input className="form-control" value={description} onChange={e => setDescription(e.target.value)} type="text" />
                                            </div>
                                            <div className="modal-footer">
                                                <button type="button" className="btn btn-warning" data-bs-dismiss="modal" onClick={() => onClickEdit(description, toDo.todo_id, toDo.description)}>Edit</button>
                                                <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Close</button>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <button className="btn btn-danger d-inline-block ms-1" onClick={() => onClickDelete(toDo.todo_id)}>Delete</button>
                            </div>
                        </li>) : <li className="list-group-item">ToDo list empty</li>}

                </ul>
            </div>

        </>
    )

}