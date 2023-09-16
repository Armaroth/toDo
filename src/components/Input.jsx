import { useState } from "react"
import './dashboard.css';

export function Input({ handleData }) {

    const [value, setValue] = useState('');

    async function onSubmitForm(e) {
        e.preventDefault();
        if (!value) {
            return
        }

        const response = await fetch('http://localhost:4000', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ value })
        });
        setValue('');
        handleData();

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