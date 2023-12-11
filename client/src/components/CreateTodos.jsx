import { useContext, useRef, useState, useEffect } from "react"
import { useNewTodo } from '../hooks'


export function CreateTodos() {
    const mutation = useNewTodo();
    const [value, setValue] = useState('');

    async function onSubmitForm(e) {
        e.preventDefault();
        mutation.mutate(value);
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
        </>
    )
}