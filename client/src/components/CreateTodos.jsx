import { useContext, useRef, useState, useEffect } from "react"
import { ToDoContext } from "../context/todoContext";



export function CreateTodos() {
    const x = useRef();
    useEffect(() => {

        x.current.focus()


    }, [])
    const [value, setValue] = useState('');
    const { postMutation } = useContext(ToDoContext);
    async function onSubmitForm(e) {
        e.preventDefault();
        if (!value) {
            return
        }
        postMutation.mutate(value);
        setValue('');
    }

    return (
        <>
            <div className="mt-5 container" id="inputTodo">
                <h1 className="text-center">ToDO list</h1>
                <form className="d-flex mt-5" onSubmit={onSubmitForm}>
                    <input ref={x} className="form-control" value={value}
                        onChange={(e) => setValue(e.target.value)} />
                    <button className="btn btn-primary" >Add</button>
                </form>
            </div>

        </>)
}