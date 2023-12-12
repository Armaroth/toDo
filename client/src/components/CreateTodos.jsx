import { useEffect, useRef } from "react"
import { useNewTodo } from '../hooks'

export function CreateTodos() {
    const mutation = useNewTodo();
    const inputRef = useRef();

    useEffect(() => {
        inputRef.current.focus();
    }, [])

    async function onSubmitForm(e) {
        e.preventDefault();
        const value = inputRef.current.value;
        inputRef.current.value = '';
        await mutation.mutateAsync(value);
    }
    return (
        <>
            <div className="mt-5 container" id="inputTodo">
                <h1 className="text-center">ToDO list</h1>
                <form className="d-flex mt-5" onSubmit={onSubmitForm}>
                    <input className="form-control" ref={inputRef} />
                    <button className="btn btn-primary" >Add</button>
                </form>
            </div>
        </>
    )
}