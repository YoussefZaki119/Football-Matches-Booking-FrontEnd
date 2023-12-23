import React, { useState } from "react";
import Login from "./Login";
import Register from "./Register";
import Main from "./main/Main";
import Card from "./Card";
import Matches from "../matches.js";
import MatchCreation from "./manager/MatchCreation.jsx";
import AddStadium from "./manager/AddStadium.jsx"
import ViewStadiums from "./ViewStadiums.jsx";
import EditMatch from "./manager/EditMatch.jsx";
import ManagerResponsiveAppBar from "./main/ManagerHeader.jsx";
import ManagerCard from "./manager/MangerCard.jsx";
import ManagerViewStadium from "./manager/ManagerViewStadium.jsx";
import Seatbooking from "./Reservation.jsx";
import PaymentForm from "./PaymentForm.jsx"
import ViewUsers from "./ViewUsers.jsx"
import ResponsiveAppBar from "./main/Header.jsx";
import EditProfile from "./EditData.jsx";
import GuestCard from "./Guest/GuestCard.jsx";
import GuestResponsiveAppBar from "./main/GuestHeader.jsx";
import GuestViewStadium from "./Guest/GuestViewStadium.jsx";

import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";


function App2() {
    function createMatch(Matches) {
        return (
            <Card
                key={Matches.id}
                team1={Matches.team1}
                team2={Matches.team2}
                date={Matches.date}
                time={Matches.time}
                image_url1={Matches.image_url1}
                image_url2={Matches.image_url2}
                venue={Matches.venue}
                mainRefree={Matches.mainRefree}
                linesmen={Matches.linesmen}

            />
        );
    }

    function createManagerMatch(Matches) {
        return (
            <ManagerCard
                key={Matches.id}
                team1={Matches.team1}
                team2={Matches.team2}
                date={Matches.date}
                time={Matches.time}
                image_url1={Matches.image_url1}
                image_url2={Matches.image_url2}
                venue={Matches.venue}
                mainRefree={Matches.mainRefree}
                linesmen={Matches.linesmen}

            />
        );
    }

    function createGuestMatch(Matches){
        return (
            <GuestCard
                key={Matches.id}
                team1={Matches.team1}
                team2={Matches.team2}
                date={Matches.date}
                time={Matches.time}
                image_url1={Matches.image_url1}
                image_url2={Matches.image_url2}
                venue={Matches.venue}
                mainRefree={Matches.mainRefree}
                linesmen={Matches.linesmen}

            />
        );
    }


    const [isRegistered, setIsRegistered] = useState(true);

    function notRegistered() {
        setIsRegistered(false);
    }

    function registered() {
        setIsRegistered(true);
    }
    const router = createBrowserRouter([
        {
            path: "/",
            element: <div className="App">
                {isRegistered ? (
                    <Login onChecked={notRegistered} />
                ) : (
                    <Register onChecked={registered} />
                )}
            </div>,
        },
        {
            path: "main",
            element: <Main />

        },
        {
            path: "/matches",
            element: <div className="matchesviewing">
                <ResponsiveAppBar />
                {Matches.map(createMatch)}
            </div>
        },
        {
            path: "manager",
            element: <div>
                <MatchCreation />
                {/* <PaymentForm /> */}
            </div>
        },
        {


            path: "manager",
            element: <div>
                <ManagerResponsiveAppBar />
            </div>
        },
        {

            path: "addstadium",
            element: <div>
                <AddStadium />
            </div>

        },
        {
            path: "managermatches",
            element: <div>
                <ManagerResponsiveAppBar />
                {Matches.map(createManagerMatch)}
            </div>
        },
        {
            path: "editmatch",
            element: <div>
                <EditMatch />
            </div>


        },
        {
            path: "managerstadium",
            element: <div>
                {/* <ManagerViewStadium /> */}
                <ViewUsers />
            </div>

        },
        {
            path: "reservation",
            element: <div>
                <Seatbooking />
            </div>

        },{
            path: "payment",
            element: <div>
                <PaymentForm />
            </div>
        },{
            path: "viewusers",
            element: <div>
                <ViewUsers />
            </div>
        },{
            path: "viewstadiums",
            element: <div>
                <ViewStadiums />
            </div>
        },{
            path: "editprofile",
            element: <div>
            <ResponsiveAppBar/>
                <EditProfile />
            </div>
        },{
            path: "guest",
            element: <div>
                <GuestResponsiveAppBar />
                {Matches.map(createGuestMatch)}
            </div>
        },{
            path: "gueststadium",
            element: <div>
                <GuestResponsiveAppBar />
                <GuestViewStadium />
            </div>
        }


    ]);

    return (
        <RouterProvider router={router} />

    );
}

export default App2;