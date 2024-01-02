import { useDeleteTodo, useNewTodo } from '../../hooks'
import { useContext } from 'react';
import { UserContext } from '../../context/userContext';
import { Todo } from '../Todo';
import { EmptyTodo } from '../EmptyTodo';
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
    if (status === 'pending' || todos?.length &&
        todos[0]?.user_id !== currentUser.id) {
        return (
            <>
                <div className="container mt-5 ">
                    <ul className="list-group">
                        <EmptyTodo darkTheme={darkTheme} message={'Loading...'} />
                    </ul>
                </div>
            </>
        )
    }

    if (status === 'success' && !todos?.length) return <EmptyTodo darkTheme={darkTheme} message={'No archived toDos.'} />

    return (
        <>
            <ul className="list-group">
                {todos.map(
                    todo => (
                        <Todo darkTheme={darkTheme} key={todo.todo_id} todo={todo} isArchived={true} />
                    )
                )}

            </ul>
        </>

    )
}
