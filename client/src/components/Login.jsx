import { useContext, useState } from "react"
import "../App.css"
import { Link } from 'react-router-dom'
import { UserContext } from "../context/userContext";

export function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { setToken } = useContext(UserContext);
    async function handleSubmit(e) {
        e.preventDefault();
        const response = await fetch(`http://localhost:4000/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        })
        if (response.ok) {
            const { token } = await response.json();
            localStorage.setItem('token', JSON.stringify(token))
            setToken(token);
        } else {
            const message = await response.text();
            console.log(message);
        }
    }
    return (
        <>
            <div className="container justify-content-center mt-5 text-center">
                <form className="form" onSubmit={handleSubmit}>
                    <div>
                        <h1>Login!</h1>
                        <input className="form-control my-4" type="text"
                            name="email" placeholder="e-mail" id="email" value={email} onChange={e => setEmail(e.target.value)} />
                    </div>
                    <div>
                        <input className="form-control my-3" type="password"
                            name="password" placeholder="password" id="password" value={password} onChange={e => setPassword(e.target.value)} />
                    </div>
                    <div>
                        <button type="submit" className="btn btn-primary"
                        > Login</button>
                    </div>
                </form>
                <h2 className="mt-5 h3">
                    Are you new?
                    <Link to={'/register'}> Register </Link>
                    here.
                </h2>
            </div>

        </>
    )
}