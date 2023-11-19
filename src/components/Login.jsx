import React from "react";
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { dividerClasses } from "@mui/material";

function Login() {
    return (
        <div className="container">
            <h1>Welcome Back</h1>
            <form>
                <input name="username" placeholder="UserName" required />
                <input type="password" name="password" placeholder="Password" required />
                <button className="mainbutton">Login</button>
                <br />
                <a className="secondarybutton">Register</a>
                <a className="secondarybutton" >Continue as a Guest</a>
            </form>
        </div>
    );

}


export default Login;