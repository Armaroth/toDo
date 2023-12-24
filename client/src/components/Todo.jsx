import { EditModal } from "./EditModal";
import { useDeleteTodo, useNewTodo, useCheckBox, useArchiveTodo } from '../hooks';
import './styles/Todo.css';
export function Todo({ darkTheme, todo, isArchived }) {
    const postMutation = useNewTodo();
    const deleteMutation = useDeleteTodo();
    const checkBoxMutation = useCheckBox();
    const archiveMutation = useArchiveTodo();
    const styles = darkTheme ? 'bg-dark text-light border border-white' : 'bg-light text-dark  border border-dark';
    async function restoreTodo(description) {
        postMutation.mutate(description);
    };
    async function deleteTodo(id, table) {
        await deleteMutation.mutateAsync({ id, table })
    };
    async function postTodo(id) {
        await archiveMutation.mutateAsync(id)
    };
    async function onCheckBoxChange(toDo) {
        checkBoxMutation.mutate({ toDo_id: toDo.todo_id, completed: toDo.completed });
    };
    async function onClickArchive(id) {
        if (archiveMutation.status === 'pending' || deleteMutation.status === 'pending') return;
        const table = 'todos';
        await postTodo(id).then(() => {
            deleteTodo(id, table)
        })
    };

    return (
        <>
            <li className={`${styles} list-group-item d-flex align-items-center justify-content-between my-1 px-2 border border-secondary`} id={`todo${todo.todo_id}`} >
                <p className={`h6 px-1`}>
                    {todo.description}
                </p>
                {isArchived ?
                    <div className=' d-flex flex-nowrap'>
                        <button className="btn btn-success d-inline-block mx-1 border border-secondary"
                            onClick={async () => {
                                await restoreTodo(todo.description).then(async () => await deleteTodo(todo.todo_id, 'archived'))
                            }}
                        >Restore
                        </button>
                        <button className="btn btn-danger d-inline-block p-2 border border-secondary"
                            onClick={async () => await deleteTodo(todo.todo_id, 'archived')}
                        >Delete
                        </button>
                    </div> :
                    <div className="align-self-end d-flex">
                        <div className="form-check my-2">
                            <input className="form-check-input" id={`check-box${todo.todo_id}`} type="checkbox" checked={todo.completed}
                                onChange={async () => await onCheckBoxChange(todo)} />
                        </div>
                        <EditModal toDo={todo} />
                        {/* archive button */}
                        <button className="btn btn-danger d-inline-block ms-1 border-secondary"
                            onClick={async () => await onClickArchive(todo.todo_id)}>Archive
                        </button>
                    </div>
                }
            </li>
        </>
    )
}