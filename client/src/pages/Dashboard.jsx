import { TodoList } from "../components/TodoList";
import { CreateTodos } from "../components/CreateTodos";
import "./styles/dashboard.css";
import { TopBar } from "../components/TopBar";

export function Dashboard() {
    return (
        <div id="dashboard" >
            <TopBar />
            <div id="list" className="container">
                <CreateTodos />
                <TodoList />
            </div>
        </div>
    )
}

