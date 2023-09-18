




export function Register(){


    return (
        <>
            <p>Register!</p>
            <form  className="form">
                <div>
                <label htmlFor="username">E-mail:</label>
                <input type="text" name="email" placeholder="e-mail" id="email" />    
                </div>
                <div>
                <label htmlFor="username">username:</label>
                <input type="username" name="username" placeholder="username" id="username" />
                </div>
                <div>
                <label htmlFor="password">Password:</label>
                <input type="password" name="password" placeholder="password" id="password" />
                </div>
                <div>
                    <button type="submit" className="button"> register</button>
                </div>
                
            </form>

        </>
    )
}