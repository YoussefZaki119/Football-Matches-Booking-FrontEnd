import React, { useEffect, useState } from "react";
import Login from "./Login";
import Register from "./Register";
import Main from "./main/Main";
import Card from "./Card";
//import Matches from "../matches.js";
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
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";


function App2() {
    const [Matches, setMatches] = useState([]);
    const [TeamA, setTeamA] = useState([]);
    const [TeamH, setTeamH] = useState([]);
    const [Stadiums, setStadiums] = useState([]);
    const [HeadRef, setHeadRef] = useState([]);
    const [RightMan, setRightMan] = useState([]);
    const [LeftMan, setLeftMan] = useState([]);

    useEffect(() => {
        async function fetchMatches() {
            try {
                const response = await fetch("http://localhost:3000/matches", {
                    method: "GET",
                    mode: "cors"
                });
                const data = await response.json();
                setMatches(data);
            } catch (error) {
                console.error('Error fetching matches:', error);
            }
        }

        fetchMatches();
    }, []);

    useEffect(() => {
        async function fetchTeams() {
            try {
                const fetchPromisesA = Matches.map(match =>
                    fetch(`http://localhost:3000/teams/${match.teamAway}`, {
                        method: "GET",
                        mode: "cors"
                    }).then(res => res.json())
                );
                const fetchPromisesH = Matches.map(match =>
                    fetch(`http://localhost:3000/teams/${match.teamHome}`, {
                        method: "GET",
                        mode: "cors"
                    }).then(res => res.json())
                );
                const fetchPromisesStadium = Matches.map(match =>
                    fetch(`http://localhost:3000/stadiums/${match.stadiumId}`, {
                        method: "GET",
                        mode: "cors"
                    }).then(res => res.json())
                );
                const fetchPromisesHeadRef = Matches.map(match =>
                    fetch(`http://localhost:3000/referees?id=${match.mainReferee}`, {
                        method: "GET",
                        mode: "cors"
                    }).then(res => res.json())
                );
                const fetchPromisesRightMan = Matches.map(match =>
                    fetch(`http://localhost:3000/referees?id=${match.lineRefereeRight}`, {
                        method: "GET",
                        mode: "cors"
                    }).then(res => res.json())
                );
                const fetchPromisesLeftMan = Matches.map(match =>
                    fetch(`http://localhost:3000/referees?id=${match.lineRefereeLeft}`, {
                        method: "GET",
                        mode: "cors"
                    }).then(res => res.json())
                );
                
                const teamsA = await Promise.all(fetchPromisesA);
                const teamsH = await Promise.all(fetchPromisesH);
                const stadiums = await Promise.all(fetchPromisesStadium);
                const headRef = await Promise.all(fetchPromisesHeadRef);
                const rightMan = await Promise.all(fetchPromisesRightMan);
                const leftMan = await Promise.all(fetchPromisesLeftMan);
                setTeamA(teamsA);
                setTeamH(teamsH);
                setStadiums(stadiums);
                setHeadRef(headRef);
                setRightMan(rightMan);
                setLeftMan(leftMan);
            } catch (error) {
                console.error('Error fetching teams:', error);
            }
        }

        fetchTeams();
    }, [Matches]);

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
                {
                    createMatch()
                }
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
                {
                    // createMatch(Matches, TeamA, TeamH)
                }
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


                {/* <ViewUsers /> */}

            </div>

        },
        {
            path: "reservation/:id",
            element: <div>
                <Seatbooking />
            </div>

        }, {
            path: "payment",
            element: <div>
                <PaymentForm />
            </div>
        }, {
            path: "viewusers",
            element: <div>
                <ViewUsers />
            </div>
        }, {
            path: "viewstadiums",
            element: <div>
                <ViewStadiums />
            </div>
        }, {
            path: "editprofile",
            element: <div>
                <ResponsiveAppBar />
                <EditProfile />
            </div>
        }, {
            path: "guest",
            element: <div>
                <GuestResponsiveAppBar />
                {
                    createGuestMatch()
                }
            </div>
        }, {
            path: "gueststadium",
            element: <div>
                <GuestResponsiveAppBar />
                <GuestViewStadium />
            </div>
        }, {
            path: "checkseats",
            element: <div>
                <CheckSeats />
            </div>
        }, {
            path: "editprofilemanager",
            element: <div>
                <ManagerResponsiveAppBar />
                <EditProfileManager />
            </div>
        }


    ]);

    return (
        <RouterProvider router={router} />

    );

}

export default App2;