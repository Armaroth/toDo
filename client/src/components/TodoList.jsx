import { useContext } from "react";
import { EmptyTodo } from "./EmptyTodo";
import { Todo } from "./Todo";
import { UserContext } from "../context/userContext";
import { useToDos } from '../hooks';
import PropTypes from 'prop-types';

export function TodoList({ darkTheme }) {
    const { data, status } = useToDos();
    const { currentUser } = useContext(UserContext);
    if (status === 'pending' || (data?.length && currentUser?.id !== data[0]?.user_id)) {
        return (
            <>
                <div className="container mt-5 text-center ">
                    <ul className="list-group">
                        <EmptyTodo darkTheme={darkTheme} message={'Loading...'} />
                    </ul>
                </div>
            </>
        )
    }
    return (
        <>
            <div className="container mt-5 ">
                <ul className="list-group">
                    {data?.length ? data.map(
                        todo => <Todo darkTheme={darkTheme} key={todo.todo_id} todo={todo} isArchived={false} />)
                        : <EmptyTodo darkTheme={darkTheme} message={'Nothing toDo!'} />}
                </ul>
            </div>
        </>
    )
}
TodoList.propTypes = {
    darkTheme: PropTypes.bool.isRequired
}
TodoList.defaultProps = {
    darkTheme: false
};
