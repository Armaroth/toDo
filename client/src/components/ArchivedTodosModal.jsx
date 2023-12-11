import './styles/ArchivedTodos.css'
import { useArchivedToDos } from '../hooks'
import { useContext } from 'react';
import { UserContext } from '../context/userContext';
import { ToDoContext } from '../context/todoContext';

export function ArchivedTodosModal({ show, setShow, children }) {
    const { data, status } = useArchivedToDos();
    const { currentUser } = useContext(UserContext);
    const { deleteArchivedMutation, postMutation } = useContext(ToDoContext)
    console.log(currentUser, data[0]);

    if (!show) return;
    if (data) {

    }

    if (status === 'pending' || (currentUser.id !== data[0]?.user_id && data[0])) {
        return (<>
            <div className="modal-overlay" onClick={() => setShow(false)}>
                <div className="archived-modal container" onClick={event => event.stopPropagation()}>
                    <div className="d-flex justify-content-between border-bottom">
                        <h2 className='h4 m-0 px-4 py-3'>Archived ToDos</h2>
                        <button className='btn btn-dark m-0 px-4 my-2' onClick={() => setShow(false)}>X</button>
                    </div>
                    <ul className="list-group d-flex flex-direction-row archived-list">
                        <li className="list-group-item d-flex justify-content-between my-1 px-2" >
                            <h2 className='h6'>Loading...</h2>
                        </li>
                    </ul>
                </div>
            </div >
        </>)
    }

    return (<>

        <div className="modal-overlay" onClick={() => setShow(false)}>
            <div className="archived-modal container" onClick={event => event.stopPropagation()}>
                <div className="d-flex justify-content-between border-bottom">
                    <h2 className='h4 m-0 px-4 py-3'>Archived ToDos</h2>
                    <button className='btn btn-dark m-0 px-4 my-2' onClick={() => setShow(false)}>X</button>
                </div>
                <ul className="list-group d-flex flex-direction-row archived-list">
                    {data?.length ?
                        data.map(
                            toDo => {
                                return <>
                                    <li key={toDo.todo_id} className="list-group-item d-flex justify-content-between my-1 px-2" >
                                        <p className='h6 px-3'>
                                            {toDo.description}
                                        </p>
                                        <div className=' d-flex flex-nowrap'>
                                            <button className="btn btn-success d-inline-block mx-1 "
                                                onClick={async () => {
                                                    await postMutation.mutate(toDo.description);
                                                    deleteArchivedMutation.mutate(toDo.todo_id);
                                                }}
                                            >Restore
                                            </button>
                                            <button className="btn btn-danger d-inline-block p-2"
                                                onClick={() => deleteArchivedMutation.mutate(toDo.todo_id)}
                                            >Delete
                                            </button>
                                        </div>
                                    </li>
                                </>
                            }
                        )
                        : <li className="list-group-item my-3">ToDo list empty</li>}
                </ul>
            </div>
        </div >

    </>)
}
