import { useState } from "react"
import "../App.css"
import { Link } from 'react-router-dom'



export function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handleSubmit(e) {
        e.preventDefault();
        console.log(email, ' ', password);
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
                        <button className="btn btn-success" type="submit" className="btn btn-primary"
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