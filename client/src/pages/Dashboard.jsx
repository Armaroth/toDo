import { TodoList } from "../components/TodoList";
import { CreateTodos } from "../components/CreateTodos";
import "./styles/dashboard.css";
import { TopBar } from "../components/TopBar";
import { useContext } from "react";
import { UserContext } from "../context/userContext";
export function Dashboard() {
    const { darkTheme } = useContext(UserContext);
    const darkModeClass = darkTheme.data ? 'darkMode' : 'lightMode';
    return (
        <div id={`dashboard`} className={`${darkModeClass}`} >
            <TopBar darkTheme={darkTheme.data} />
            <div id="list" className="container">
                <CreateTodos />
                <TodoList />
            </div>
        </div>
    )
}

