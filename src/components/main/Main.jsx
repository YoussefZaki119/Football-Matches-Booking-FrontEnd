import React, { useState, useEffect } from "react";
import Header from "./Header";
import { Link, useNavigate } from "react-router-dom";
import { loginusername } from "../Login";
import { useParams } from "react-router-dom";

let mainusername = "";
let mainusername1 = "";
function Main() {
    const { id } = useParams();
    const [uname, setunmae] = useState("");
    mainusername = loginusername;
    mainusername1 = loginusername;

    useEffect(() => {
        
        async function logMovies() {
            const response = await fetch("http://localhost:3000/users?user=" + id , {
              method: "get",
              mode: "cors"
            });
      
      
            const specificuser = await response.json();
            setunmae(specificuser.firstName)
            console.log("loginusername");
            console.log(loginusername);
            console.log(mainusername);
      
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
            
            navigate("../matches/"+id);
        
    }
    return (
        <div>
            {/* <Header /> */}
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
export {mainusername1};
export default Main;