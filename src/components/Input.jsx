import { useState } from "react"
import './dashboard.css';

export function Input({ setRender }) {
    const [value, setValue] = useState('');
    function onSubmitForm(e) {
        e.preventDefault();
        if (!value) {
            return
        }

        const response = fetch('http://localhost:4000', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ value })
        });
        setValue('');
        setRender();
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