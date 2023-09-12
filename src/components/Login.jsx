import "../App.css"



export function Login() {


    return (
        <>
            <p>Login!</p>
            <form className="form">
                <div>
                    <label htmlFor="email">E-mail:</label>
                    <input type="text" name="email" placeholder="e-mail" id="email" />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input type="password" name="password" placeholder="password" id="password" />
                </div>
                <div>
                    <button type="submit" className="button"> Login</button>
                </div>

            </form>

        </>
    )
}