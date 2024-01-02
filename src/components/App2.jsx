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
import CheckSeats from "./manager/CheckSeats.jsx";
import EditProfileManager from "./manager/EditData.jsx"
import AuthUsers from "./AuthorizeUsers.jsx"

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


    function createMatch() {
        if (Matches.length > 0 && TeamA.length === Matches.length && TeamH.length === Matches.length) {
            return Matches.map((match, index) => (
                <Card
                    Key={match.id}
                    team1={TeamA[index]?.name || 'Team A Name'}
                    team2={TeamH[index]?.name || 'Team H Name'}
                    date={match.time.slice(0, 10)}
                    time={match.time.slice(11, 16)}
                    image_url1={TeamA[index]?.logo || 'Image URL for Team A'}
                    image_url2={TeamH[index]?.logo || 'Image URL for Team H'}
                    venue={Stadiums[index]?.name || 'Stadium Name'}
                    mainRefree={HeadRef[index]?.name || 'Head Referee Name'}
                    linesmen={`${LeftMan[index]?.name || 'Left Linesman Name'} & ${RightMan[index]?.name || 'Right Linesman Name'}`}
                />
            ));
        } else {
            return <p>Loading...</p>;
        }
    }
    function createManagerMatch() {
        if (Matches.length > 0 && TeamA.length === Matches.length && TeamH.length === Matches.length) {
            // console.log(`ssssss${Matches[0].id}`)
            return Matches.map((match, index) => (
                
                <ManagerCard
                    Key={match.id}
                    team1={TeamA[index]?.name || 'Team A Name'}
                    team2={TeamH[index]?.name || 'Team H Name'}
                    date={match.time.slice(0, 10)}
                    time={match.time.slice(11, 16)}
                    image_url1={TeamA[index]?.logo || 'Image URL for Team A'}
                    image_url2={TeamH[index]?.logo || 'Image URL for Team H'}
                    venue={Stadiums[index]?.name || 'Stadium Name'}
                    mainRefree={HeadRef[index]?.name || 'Head Referee Name'}
                    linesmen={`${LeftMan[index]?.name || 'Left Linesman Name'} & ${RightMan[index]?.name || 'Right Linesman Name'}`}
                />
            ));
        } else {
            return <p>Loading...</p>;
        }
    }
    function createGuestMatch() {
        if (Matches.length > 0 && TeamA.length === Matches.length && TeamH.length === Matches.length) {
            return Matches.map((match, index) => (
                <GuestCard
                    Key={match.id}
                    team1={TeamA[index]?.name || 'Team A Name'}
                    team2={TeamH[index]?.name || 'Team H Name'}
                    date={match.time.slice(0, 10)}
                    time={match.time.slice(11, 16)}
                    image_url1={TeamA[index]?.logo || 'Image URL for Team A'}
                    image_url2={TeamH[index]?.logo || 'Image URL for Team H'}
                    venue={Stadiums[index]?.name || 'Stadium Name'}
                    mainRefree={HeadRef[index]?.name || 'Head Referee Name'}
                    linesmen={`${LeftMan[index]?.name || 'Left Linesman Name'} & ${RightMan[index]?.name || 'Right Linesman Name'}`}
                />
            ));
        } else {
            return <p>Loading...</p>;
        }
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
            path: "matches",
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

                {
                     createManagerMatch()
                }

            </div>
        },
        {
            path: `editmatch/:id`,
            element: <div>
              <EditMatch />
            </div>
        },
        {
            path: "managerstadium",
            element: <div>
                <ManagerViewStadium />
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

                {
                    createGuestMatch()
                }

            </div>
        },{
            path: "gueststadium",
            element: <div>
                <GuestResponsiveAppBar />
                <GuestViewStadium />
            </div>
        },{
            path: "checkseats",
            element: <div>
                <CheckSeats />
            </div>
        },{
            path: "editprofilemanager",
            element: <div>
                <ManagerResponsiveAppBar />
                <EditProfileManager />
            </div>
        },{
            path: "admin",
            element: <div>
                {/* <ViewUsers /> */}
                <AuthUsers/>
            </div>
        }


    ]);

    return (
        <RouterProvider router={router} />

    );
}

export default App2;