import { useContext } from "react";
import { UserContext } from "../context/userContext";
import { useLogout } from "../hooks";
import { ArchivedToDos } from '../components/ArchivedTodos'
export function TopBar() {
    const { currentUser } = useContext(UserContext);
    const logout = useLogout();
    return (
        <>
            <div className="d-flex justify-content-between py-2 sticky-top border-bottom border-secondary bg-light">
                <ArchivedToDos />
                <button className="btn btn-dark d-inline ml-1 border border-secondary" onClick={() => {
                    logout.mutate(currentUser.id)
                }}>Logout</button>
            </div>
        </>
    )
}