import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { UserContext } from "../context/userContext";

export function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const { error, setError, registerMutation } = useContext(UserContext);

    useEffect(() => {
        setInterval(() => {
            if (error) {
                setError(() => '')
            }
        }
            , '4000')
    }, [error])

    async function handleSubmit(e) {
        e.preventDefault();
        registerMutation.mutate({ email, password, username });
    }
    return (
        <div className="container justify-content-center mt-5 text-center">

            <form className="form" onSubmit={handleSubmit}>
                <h1>Register</h1>
                <div>
                    <input className="form-control my-3" type="text"
                        name="email" placeholder="e-mail" id="email" value={email}
                        onChange={e => setEmail(e.target.value)} />
                </div>
                <div>
                    <input className="form-control my-3" type="text"
                        name="username" placeholder="username" id="username" value={username}
                        onChange={e => setUsername(e.target.value)} />
                </div>
                <div>
                    <input className="form-control my-3" type="password"
                        name="password" placeholder="password" id="password" value={password}
                        onChange={e => setPassword(e.target.value)} />
                </div>
                <div>
                    <button type="submit" className="btn btn-primary"> Register</button>
                </div>
                {error && <span>{error}</span>}
                <h2 className="mt-5 h3">
                    Already have an account?
                    <Link to={'/login'}> Login </Link>
                    here.
                </h2>
            </form>
        </div>
    )
}