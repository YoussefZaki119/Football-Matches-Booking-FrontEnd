import React from "react";
import Header from "./Header";
import { Link, useNavigate } from "react-router-dom";

function Main() {
    const navigate = useNavigate();
    function CheckType() {
            // Use navigate to navigate to the manager path
            
            navigate("/matches");
        
    }
    return (
        <div>
            <Header />
            <div className="welcome">
                <h1 className="welcometext">Welcome Back Folan<br/>to the best booking site for<br/>Booking EFA matches</h1>
                <button className="viewmatchbutton" type="button" onClick={CheckType}>
                        View Matches
                    </button>
            </div>
        </div>
    );
}

export default Main;