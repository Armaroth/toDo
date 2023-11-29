import { useEffect, useState } from 'react'
import './styles/ArchivedTodos.css'
import { useContext } from 'react'
import { UserContext } from '../context/userContext'
import { ToDoContext } from '../context/todoContext';
import { useQueryClient } from '@tanstack/react-query';


export function ArchivedToDos() {
    const queryCLient = useQueryClient();
    const [show, setShow] = useState(false);
    const { archivedToDos, setArchivedToDos } = useContext(UserContext);
    const { archivedData, archivedStatus, archivedIsFetching, postMutation, deleteArchivedMutation } = useContext(ToDoContext)

    useEffect(() => {
        if (archivedStatus === 'success' && !archivedIsFetching) {
            queryCLient.invalidateQueries(['archivedTodos']);
            setArchivedToDos(() => archivedData);
        }
    }, [archivedStatus, archivedData])

    return (
        <>
            <button className="btn mx-2 btn-light" disabled={archivedStatus == 'pending' || archivedIsFetching} onClick={() => {
                setShow(true);
            }}> Archived toDos</button>
            {show && (
                <div className="modal-overlay" onClick={() => setShow(false)}>
                    <div className="archived-modal container" onClick={event => event.stopPropagation()}>
                        <div className="d-flex justify-content-between">

                            <h2 className='h4 m-0 px-4'>Archived ToDos</h2>
                            <button className='btn btn-dark m-0 px-4' onClick={() => setShow(false)}>x</button>
                        </div>
                        <ul className="list-group d-flex flex-direction-row archived-list">
                            {archivedToDos.length ? archivedToDos.map(
                                toDo => <>
                                    <li key={toDo.todo_id} className="list-group-item d-flex justify-content-between my-1 px-2" >
                                        <p className='h6 px-3'>
                                            {toDo.description}
                                        </p>
                                        <div>
                                            <button className="btn btn-success d-inline-block mx-1 p-2" onClick={async () => {
                                                await postMutation.mutate(toDo.description);
                                                deleteArchivedMutation.mutate(toDo.todo_id);
                                            }}
                                            >Restore
                                            </button>
                                            <button className="btn btn-danger d-inline-block p-2" onClick={() => deleteArchivedMutation.mutate(toDo.todo_id)}
                                            >Delete
                                            </button>
                                        </div>
                                    </li>
                                </>
                            )
                                : <li className="list-group-item my-3">ToDo list empty</li>}
                        </ul>
                    </div>
                </div >
            )
            }
        </>
    )
}
