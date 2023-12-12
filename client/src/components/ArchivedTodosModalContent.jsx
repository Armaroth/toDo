import { useDeleteTodo, useNewTodo } from '../hooks'
import { useContext } from 'react';
import { UserContext } from '../context/userContext';
export function ArchivedTodosModalContent({ todos, status }) {

    const { currentUser } = useContext(UserContext);
    const postMutation = useNewTodo();
    const deleteMutation = useDeleteTodo();

    async function restoreTodo(description) {
        postMutation.mutate(description);
    }
    async function deleteTodo(id) {
        const table = 'archived';
        deleteMutation.mutate({ id, table })

    }
    if (status === 'pending' || todos?.length && todos[0].user_id !== currentUser.id) return <li className="list-group-item d-flex justify-content-between my-1 px-2" >
        <h2 className='h6'>Loading</h2>
    </li>

    if (status === 'success' && !todos?.length) return <li className="list-group-item d-flex justify-content-between my-1 px-2" >
        <h2 className='h6' >List is empty</h2>
    </li>

    return todos.map(
        todo => (<>
            <li key={todo.todo_id} className="list-group-item d-flex justify-content-between my-1 px-2" >
                <p className='h6 px-3'>
                    {todo.description}
                </p>
                <div className=' d-flex flex-nowrap'>
                    <button className="btn btn-success d-inline-block mx-1 "
                        onClick={async () => {
                            await restoreTodo(todo.description).then(() => deleteTodo(todo.todo_id))
                        }}
                    >Restore
                    </button>
                    <button className="btn btn-danger d-inline-block p-2"
                        onClick={async () => deleteTodo(todo.todo_id)}
                    >Delete
                    </button>
                </div>
            </li>

        </>
        )
    )
}