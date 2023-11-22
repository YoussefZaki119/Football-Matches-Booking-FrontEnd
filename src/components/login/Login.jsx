import React from "react";
import { Link } from "react-router-dom";
function Login(props) {
    return (
        <div className="container">
            <h1>Welcome Back</h1>
            <form>
                <input name="username" placeholder="UserName" required />
                <input type="password" name="password" placeholder="Password" required />
                <button className="mainbutton">Login</button>
                <br />
                <a className="secondarybutton" onClick={props.onChecked}>Register</a>
                <a className="secondarybutton" ><Link to="main">Continue as a Guest</Link></a>
            </form>
        </div>
    );

}


export default Login;