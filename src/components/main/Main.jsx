import React, { useState, useEffect } from "react";
import Header from "./Header";
import { Link, useNavigate } from "react-router-dom";
import { loginusername } from "../Login";

let mainusername = "";
function Main() {
    const [uname, setunmae] = useState("");
    mainusername = loginusername;
    useEffect(() => {
        
        async function logMovies() {
            const response = await fetch("http://localhost:3000/users?users=" + loginusername , {
              method: "get",
              mode: "cors"
            });
      
      
            const specificuser = await response.json();
            // console.log(specificuser);
            setunmae(specificuser[0].firstName)
            console.log(uname);
           
      
            // if (specificuser.role === "Fan") {
            //   navigate("main");
            // } else if (specificuser.role === "Manager") {
            //   navigate("manager");
            // }
        
        }
      
       
        logMovies();
       
      }, []);
    const navigate = useNavigate();
    function CheckType() {
            // Use navigate to navigate to the manager path
            
            navigate("/matches");
        
    }
    return (
        <div>
            <Header />
            <div className="welcome">
                <h1 className="welcometext">Welcome Back {uname}<br/>to the best booking site for<br/>Booking EFA matches</h1>
                <button className="viewmatchbutton" type="button" onClick={CheckType}>
                        View Matches
                    </button>
            </div>
        </div>
    );
}

export {mainusername};
export default Main;