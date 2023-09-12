import { useEffect, useState } from "react";
import './dashboard.css'

export function Dashboard() {

    const [username, setUsername] = useState("")
    const [users, setUsers] = useState([])

    useEffect(() => {
        async function handleData() {
            const data = await fetch('http://localhost:4000');
            const result = await data.json();
            setUsers(result);
        }

        handleData();

    })

    async function onSubmitForm(e) {
        e.preventDefault();
        const response = await fetch('http://localhost:4000', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username })
        });
        setUsername('')
    }

    return (
        <>
            <div className="mt-5 container" id="inputTodo">
                <h1 className="text-center">ToDO list</h1>
                <form className="d-flex mt-5" action="/" onSubmit={onSubmitForm}>
                    <input className="form-control" value={username} onChange={(e) => setUsername(e.target.value)} />
                    <button className="btn btn-primary" >Add</button>
                </form>

            </div>
            <div className="showToDo container mt-5">

                <div>
                    {users.map(user => <p key={users.indexOf(user)}>{user}</p>)}
                </div>

            </div>
        </>
    )
}