import { useContext } from "react";
import { UserContext } from "../context/userContext";
import { useLogout, useToggleDarkMode } from '../hooks';
import { ArchivedToDos } from './ArchivedModal/ArchivedTodos';
export function TopBar() {
    const { currentUser } = useContext(UserContext);
    const logout = useLogout();
    const toggleDarkMode = useToggleDarkMode();
    return (
        <>
            <div className="d-flex justify-content-between py-2 sticky-top border-bottom border-secondary bg-light">
                <ArchivedToDos />
                <div>
                    <button className="btn btn-dark d-inline mx-3 rounded-pill" onClick={() => toggleDarkMode.mutate()}>Dark mode</button>
                    <button className="btn btn-dark d-inline ml-1 border border-secondary" onClick={() => {
                        logout.mutate(currentUser?.id)
                    }}>Logout</button>
                </div>

            </div>
        </>
    )
}