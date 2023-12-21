import { useEffect, useRef } from "react"
import { useNewTodo } from '../hooks'
import { useContext } from "react";
import { UserContext } from "../context/userContext";
export function CreateTodos() {
    const mutation = useNewTodo();
    const inputRef = useRef();
    const { currentUser } = useContext(UserContext);
    useEffect(() => {
        inputRef.current.focus();
    }, [])

    async function onSubmitForm(e) {
        e.preventDefault();
        const value = inputRef.current.value;
        if (!value) return;
        inputRef.current.value = '';
        await mutation.mutateAsync(value);
    }
    return (
        <>
            <div className="mt-5 container justify-content-center" id="inputTodo">
                <header className="d-flex justify-content-center">
                    <h1 className="text-center border border-secondary bg-light rounded-pill h4 w-50 py-2">{`${currentUser?.userName}'s `}To-do list</h1>
                </header>
                <form className="d-flex mt-5" onSubmit={onSubmitForm}>
                    <input className="form-control shadow-none border-secondary border-end-0 rounded-0 rounded-start" ref={inputRef} />
                    <button className="btn btn-primary border-secondary border-start-0  px-4 d-flex  rounded-0 rounded-end align-items-center" ><b>Add</b></button>
                </form>
            </div>
        </>
    )
}