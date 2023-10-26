import { useContext, useState } from "react"
import { fetchWithAuth } from "../auth.helpers";
import { ToDoContext } from "../context/todoContext";



export function Input() {

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
                    <input className="form-control" value={value}
                        onChange={(e) => setValue(e.target.value)} />
                    <button className="btn btn-primary" >Add</button>
                </form>
            </div>

        </>)
}