import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/userContext";
import { useRegister } from '../hooks';
import "./styles/register.css";

export function Register() {
    const { darkTheme } = useContext(UserContext);
    const styles = darkTheme.data ? 'bg-dark text-white' : 'bg-light';
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const mutation = useRegister();
    const { error, setError } = useContext(UserContext);

    const patterns = {
        username: /^[a-z\d]{5,12}$/i,
        email: /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/,
        password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#-_]).{8,20}$/
    }
    useEffect(() => {
        if (error) {
            setError(() => '')
        }
    }, [password, email, username])

    async function handleSubmit(e) {
        e.preventDefault();
        mutation.mutate({ email, password, username });
    }
    return (
        <>
            <div className={`${styles}`}>
                <div id="container" className={`container justify-content-center  text-center ${styles}`}>
                    <form className="form" onSubmit={handleSubmit}>
                        <h1 className="pt-4">Register</h1>
                        <div>
                            <input required type="text" autoComplete="off"
                                className={` form-control my-3 
                        ${((email && !patterns.email.test(email) ? 'border border-danger' : ''))}
                        ${((patterns.email.test(email) ? 'border border-success' : ''))} `}
                                name="email" placeholder="e-mail" id="email" value={email}
                                onChange={e => setEmail(e.target.value)} />
                            {(email && !patterns.email.test(email) && <p className="h6">Email must be a valid address e.g me@mydomain.com</p>)}
                        </div>
                        <div>
                            <input required type="text" autoComplete="off"
                                className={` form-control my-3 ${((username && !patterns.username.test(username) ? 'border border-danger' : ''))}
                        ${((patterns.username.test(username) ? 'border border-success' : ''))} `}
                                name="username" placeholder="username" id="username" value={username}
                                onChange={e => setUsername(e.target.value)} />
                            {(username && !patterns.username.test(username) && <p className="h6">Username must be alphanumeric and contain 5-12 characters.</p>)}
                        </div>
                        <div>
                            <input required type="password" autoComplete="off"
                                className={` form-control my-3 ${((password && !patterns.password.test(password) ? 'border border-danger' : ''))}
                        ${((patterns.password.test(password) ? 'border border-success' : ''))} `}
                                name="password" placeholder="password" id="password" value={password}
                                onChange={e => setPassword(e.target.value)} />
                            {(password && !patterns.password.test(password) && <p className="h6">Password must be alphanumeric, have at least a lower-case letter, an uppercase letter, a number and a special character (@, !, _ and -) and be 8-20 characters.</p>)}
                        </div>
                        <div>
                            <button type="submit" className="btn btn-primary"
                                disabled={(!patterns.email.test(email) || !patterns.username.test(username) || !patterns.password.test(password))}> Register</button>
                        </div>
                        {error && <span className="h6">{error}</span>}
                        <h2 className="mt-5 h3">
                            Already have an account?
                            <Link to={'/login'}> Login </Link>
                            here.
                        </h2>
                    </form>
                </div>
            </div >
        </>
    )
}