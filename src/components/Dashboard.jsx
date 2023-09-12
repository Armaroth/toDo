import "../App.css"
import { useState } from "react"



export function Dashboard() {


    const [username, setUsername] = useState("")
    async function onSubmitForm(e){
        e.preventDefault();
        const response = await fetch('http://localhost:4000',{
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({username})});
    }

    // async function get(){
    //    const text = await fetch('http://localhost:4000');
    //    const username = await text.json();
    //    setUsername(username)
    // }

    // async function post(state){
    //     const res = await fetch('http://localhost:4000',{
    //         method: 'POST',
    //         headers: {
    //           'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify({state})})
    //         console.log(res)
    // }

    return (
        <>

            <form id="todo" action="/" onSubmit={onSubmitForm}>
                <h1>ToDO list</h1>
                <input value={username} onChange={(e) => setUsername(e.target.value)} />
                <button >Add</button>
            </form>
        </>
    )
}