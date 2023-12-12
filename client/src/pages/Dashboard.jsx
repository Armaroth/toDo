import { TodoList } from "../components/TodoList";
import { CreateTodos } from "../components/CreateTodos";
import { ArchivedToDos } from '../components/ArchivedTodos'
import { useContext } from "react";
import { UserContext } from "../context/userContext";
import "./styles/dashboard.css";
import { useLogout } from "../hooks";

export function Dashboard() {
    const { currentUser } = useContext(UserContext);
    const logout = useLogout();

    return (
        <div id="dashboard" >
            <div className="d-flex justify-content-end py-2 sticky-top">
                <h1 className="mx-3 mt-1 h4"> Current User: {currentUser.userName}</h1>
                <ArchivedToDos />
                <button className="btn btn-dark d-inline ml-1" onClick={() => {
                    logout.mutate(currentUser.id)
                }}>Logout</button>
            </div>
            <div id="list" className="container">
                <CreateTodos />
                <TodoList />
            </div>
        </div>
    )
}

