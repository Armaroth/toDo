import { useDeleteTodo, useNewTodo } from '../../hooks'
import { useContext } from 'react';
import { UserContext } from '../../context/userContext';
import { Todo } from '../Todo';
export function ArchivedTodosModalContent({ darkTheme, todos, status }) {
    const styles = darkTheme ? 'bg-dark' : 'bg-light'
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
    if (status === 'pending' || todos?.length && todos[0].user_id !== currentUser.id) return <li key={'loading'} className={`${styles} list-group-item d-flex justify-content-between my-1 px-2 border border-secondary`} >
        <h2 className='h6'>Loading</h2>
    </li>

    if (status === 'success' && !todos?.length) return <li key={'empty'} className={` ${styles} list-group-item d-flex justify-content-between my-1 px-2 border border-secondary`} >
        <h2 className='h6' >List is empty</h2>
    </li>

    return todos.map(
        todo => (<>
            <Todo darkTheme={darkTheme} key={todo.todo_id} todo={todo} isArchived={true} />
        </>
        )
    )
}