import { useContext } from "react";
import { UserContext } from "../context/userContext";
import { useLogout, useToggleDarkMode } from '../hooks';
import { ArchivedToDos } from './ArchivedModal/ArchivedTodos';
import "./styles/TopBar.css";
export function TopBar({ darkTheme }) {
    const { currentUser } = useContext(UserContext);
    const logout = useLogout();
    const toggleDarkMode = useToggleDarkMode();
    const styles = darkTheme ? 'bg-dark' : 'bg-light';
    const btnStyles = darkTheme ? 'btn-light' : 'btn-dark';

    return (
        <>
            <div className={`d-flex justify-content-between py-2 sticky-top border-bottom border-secondary ${styles}`}>
                <ArchivedToDos darkTheme={darkTheme} />
                <div>
                    <button className={`btn d-inline mx-3 rounded-pill border border-secondary  ${btnStyles}`} onClick={() => toggleDarkMode.mutate()}>Dark mode</button>
                    <button className={`btn ${btnStyles} d-inline ml-1 border border-secondary`} onClick={() => {
                        logout.mutate(currentUser?.id)
                    }}>Logout</button>
                </div>

            </div>
        </>
    )
}