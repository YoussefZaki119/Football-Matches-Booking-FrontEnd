import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login(props) {
    const [isManager, setIsManager] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const [warning, setWarning] = useState("");
    const [user, setUser] = useState({id: '', userName: '', password: '', firstName: '', lastName: '', birthDate: '', gender: '', city: '', address: '', email: '', role: 'asdfg' });
    const [submit, setsubmit] = useState("");
    useEffect(() => {
        async function logMovies() {
            const response = await fetch("http://localhost:3000/users/" + username + "/" + password,
                {
                    method: "get",
                    mode: "cors"
                });
            const specificuser = await response.json();
            console.log(specificuser);
            setUser(specificuser);
            console.log(`ashan zaki:${user.role}`)

            if(user.role==="Fan")
            {
                navigate("main");
            }
        }

        logMovies();
    }, [submit]);
    
    function CheckType() {
        setsubmit("s");

        if (username.trim() === "" || password.trim() === "") {
            setWarning("Please enter both username and password.");
            return; // Don't proceed with login if the form is empty
        }

        // Assuming username, password, M, and manager are defined somewhere in your code
        if (username === "M" && password === "M") {
            setIsManager("manager");
            // Use navigate to navigate to the manager path
            navigate("/manager");
        }
    }

    return (
        <div className="containersbody">
            <div className="container">
                <h1>Welcome Back</h1>
                <form>
                    <input
                        name="username"
                        placeholder="UserName"
                        required
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {warning && <p style={{ color: "red" }}>{warning}</p>}
                    <button className="mainbutton" type="button" onClick={CheckType}>
                        Login
                    </button>
                    <br />
                    <a className="secondarybutton" onClick={props.onChecked}>
                        Register
                    </a>
                    <a className="secondarybutton">
                        <Link to="main">Continue as a Guest</Link>
                    </a>
                </form>
            </div>
        </div>
    );
}

export default Login;
