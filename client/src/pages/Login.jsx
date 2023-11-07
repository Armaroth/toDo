import { useContext, useState, useEffect } from "react"
import { Link } from 'react-router-dom'
import { UserContext } from "../context/userContext";
import './styles/login.css'

export function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { loginMutation, error, setError } = useContext(UserContext);

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
        loginMutation.mutate({ email, password });

    }
    return (
        <>
            <div id="container" className="container justify-content-center mt-5 text-center">
                <form className="form" onSubmit={handleSubmit}>
                    <div>
                        <h1>Login!</h1>
                        <input required className="form-control my-4" type="text" autoComplete="on"
                            name="email" placeholder="e-mail" id="email" value={email} onChange={e => setEmail(e.target.value)} />
                    </div>
                    <div>
                        <input required className="form-control my-3" type="password" autoComplete="on"
                            name="password" placeholder="password" id="password" value={password} onChange={e => setPassword(e.target.value)} />
                    </div>
                    <div>
                        <button type="submit" className="btn btn-primary"
                        > Login</button>
                    </div>
                    {error && <span>{error}</span>}
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