import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { dividerClasses } from "@mui/material";
import Cities from "../../cities.js"
import { Link } from "react-router-dom";
import ManagerResponsiveAppBar from "../main/ManagerHeader.jsx";
import { matchDetails } from "./MangerCard.jsx";
import { ID } from "./MangerCard.jsx";
import { useParams } from "react-router-dom";


function EditMatch(props) {
    const { id } = useParams();
    console.log(id);
    const [Teams, setTeams] = useState([]);
    const [match, setMatch] = useState({});
    console.log(match.teamAway)
    const [selectedHTeam, setSelectedHTeam] = useState('');
    const [selectedHTeamId, setSelectedHTeamId] = useState('');
    const [selectedATeam, setSelectedATeam] = useState('');
    const [selectedATeamId, setSelectedATeamId] = useState('');
    const [Venues, setVenues] = useState([]);
    const [selectedVenue, setSelectedVenue] = useState('');
    const [selectedVenueId, setSelectedVenueId] = useState('');
    const [selectedMReferee, setSelectedMReferee] = useState('');
    const [selectedMRefereeId, setSelectedMRefereeId] = useState('');
    const [selectedAReferee1, setSelectedAReferee1] = useState('');
    const [selectedAReferee2Id, setSelectedAReferee2Id] = useState('');
    const [selectedAReferee1Id, setSelectedAReferee1Id] = useState('');
    const [selectedAReferee2, setSelectedAReferee2] = useState('');
    const [mainReferee, setMainReferee] = useState([])
    const [assistantReferee, setAssistantReferee] = useState([])
    const [matchDetails, setMatchDetails] = useState({ teamAway: match.teamAway, teamHome: match.teamHome, stadiumId: match.stadiumId, time: match.time, mainReferee: match.mainReferee, lineRefereeRight: match.lineRefereeRight, lineRefereeLeft: match.lineRefereeRight, isFull: match.isFull });
    const [isRerenderNeeded, setIsRerenderNeeded] = useState(false);
    console.log(`match lineRefereeLeft: ${match.lineRefereeLeft}`)
    useEffect(() => {
        // Set a timeout to trigger a re-render after a specific time (e.g., 5 seconds)
        const timeout = setTimeout(() => {
            setIsRerenderNeeded(true);
        }, 250);

        // Clean up the timeout to prevent memory leaks
        return () => clearTimeout(timeout);
    }, []); // Run this effect only once (on initial render)
    function postEditedMatch() {
        setMatchDetails({ id: match.id, teamAway: match.teamAway, teamHome: match.teamHome, stadiumId: match.stadiumId, time: match.time, mainReferee: match.mainReferee, lineRefereeRight: match.lineRefereeRight, lineRefereeLeft: match.lineRefereeRight, isFull: match.isFull })
        fetch(`http://localhost:3000/matches/${id}`, {
            method: "PUT", // Change "patch" to "put"
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            body: JSON.stringify(matchDetails)
        })
            .then((res) => res.json())
            .then((res) => console.log(res))
            .catch((err) => err);
        console.log("details")
        console.log(matchDetails)
    }
    function callPostEditedMatch(e) {
        e.preventDefault();
        postEditedMatch();

    }

    useEffect(() => {
        // Fetch options from the server when the component mounts
        fetch(`http://localhost:3000/matches?match=${id}`, {
            method: "get",
            mode: "cors"
        })
            .then((res) => res.json())
            .then((data) => {
                setMatch(data);
                setMatchDetails({
                    id: data.id,
                    teamAway: data.teamAway,
                    teamHome: data.teamHome,
                    stadiumId: data.stadiumId,
                    time: data.time,
                    mainReferee: data.mainReferee,
                    lineRefereeRight: data.lineRefereeRight,
                    lineRefereeLeft: data.lineRefereeLeft,
                    isFull: data.isFull,
                    teamAwayLogo: data.teamAwayLogo,
                    teamHomeLogo: data.teamHomeLogo,
                });
            })
            .catch((err) => console.log(err));

        fetch(`http://localhost:3000/teams/${match.teamAway}`, {
            method: "get",
            mode: "cors"
        })
            .then((res) => res.json())
            .then((res) => {setSelectedATeam(res.name)
                setSelectedATeamId(res.id)
            })
            .catch((err) => err);

        fetch(`http://localhost:3000/teams/${match.teamHome}`, {
            method: "get",
            mode: "cors"
        })
            .then((res) => res.json())
            .then((res) => {setSelectedHTeam(res.name)
                selectedHTeamId(res.id)
            })
            .catch((err) => err);

        fetch(`http://localhost:3000/referees?id=${match.mainReferee}`, {
            method: "get",
            mode: "cors"
        })
            .then((res) => res.json())
            .then((res) =>{ setSelectedMReferee(res.name)
                selectedMRefereeId(res.id)
            })
            .catch((err) => err);


        fetch(`http://localhost:3000/referees?id=${match.lineRefereeLeft}`, {
            method: "get",
            mode: "cors"
        })
            .then((res) => res.json())
            .then((res) => {
                setSelectedAReferee1(res.name)
                selectedAReferee1Id(res.id)
            })
            .catch((err) => err);

        fetch(`http://localhost:3000/referees?id=${match.lineRefereeRight}`, {
            method: "get",
            mode: "cors"
        })
            .then((res) => res.json())
            .then((res) => {setSelectedAReferee2(res.name)
                selectedAReferee2Id(res.id)
            })
            .catch((err) => err);

        fetch(`http://localhost:3000/stadiums/${match.stadiumId}`, {
            method: "get",
            mode: "cors"
        })
            .then((res) => res.json())
            .then((res) => {
                setSelectedVenue(res.name)
                selectedVenueId(res.id)
            })
            .catch((err) => err);


        fetch("http://localhost:3000/teams", {
            method: "get",
            mode: "cors"
        })

            .then((res) => res.json())
            .then((res) => setTeams(res))
            .catch((err) => err);
        fetch("http://localhost:3000/stadiums", {
            method: "get",
            mode: "cors"
        })
            .then((res) => res.json())
            .then((res) => setVenues(res))
            .catch((err) => err);
        fetch("http://localhost:3000/referees/main", {
            method: "get",
            mode: "cors"
        })
            .then((res) => res.json())
            .then((res) => setMainReferee(res))
            .catch((err) => err);

        fetch("http://localhost:3000/referees/assistant", {
            method: "get",
            mode: "cors"
        })
            .then((res) => res.json())
            .then((res) => setAssistantReferee(res))
            .catch((err) => err);

        // setMatchDetails({ teamAway: selectedATeamId, teamHome: selectedHTeamId, stadiumId: selectedVenueId, time: match.time, mainReferee: selectedMRefereeId, lineRefereeRight: selectedAReferee2Id, lineRefereeLeft: selectedAReferee1Id, isFull: match.isFull })

    }, [id, isRerenderNeeded]);
    useEffect(() => {
        setMatchDetails({
            id: match.id,
            teamAway: parseInt(selectedATeamId),
            teamHome: parseInt(selectedHTeamId),
            stadiumId: parseInt(selectedVenueId),
            time: match.time,
            mainReferee: parseInt(selectedMRefereeId),
            lineRefereeRight: parseInt(selectedAReferee2Id),
            lineRefereeLeft: parseInt(selectedAReferee1Id),
            isFull: match.isFull,
            teamAwayLogo: match.teamAwayLogo,
            teamHomeLogo: match.teamHomeLogo,
        });
    }, [selectedATeamId, selectedHTeamId, selectedVenueId, selectedMRefereeId, selectedAReferee2Id, selectedAReferee1Id, match.time, match.isFull]);

    return (
        <div>
            {isRerenderNeeded && (
                <div>

                    <ManagerResponsiveAppBar />

                    <div id='DivMatchCreationcontainer'>
                        <div className="MatchCreationcontainer">
                            <h1>Edit Match</h1>
                            <form>
                                <div>
                                    <label htmlFor="homeTeam">Home Team:</label>
                                    <select
                                        name="homeTeam"
                                        id="homeTeam"
                                        onChange={(e) => {
                                            setSelectedHTeamId(e.target.value);
                                            setSelectedATeamId((prevSelectedATeamId) => {
                                                if (prevSelectedATeamId === e.target.value) {
                                                    return ''; // Reset selected away team if it matches the home team
                                                }
                                                return prevSelectedATeamId;
                                            });
                                        }}
                                        value={selectedHTeamId}
                                    >
                                        <option value="" disabled>
                                            {selectedHTeam ? selectedHTeam : "Select Home Team"}
                                        </option>
                                        {Teams.map((team) => (
                                            <option
                                                key={team.id}
                                                value={team.id}
                                                disabled={team.id === selectedATeamId}
                                            >
                                                {team.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="away">Away Team:</label>
                                    <select
                                        name="awayTeam"
                                        id="awayTeam"
                                        onChange={(e) => {
                                            setSelectedATeamId(e.target.value);
                                            setSelectedHTeamId((prevSelectedHTeamId) => {
                                                if (prevSelectedHTeamId === e.target.value) {
                                                    return ''; // Reset selected home team if it matches the away team
                                                }
                                                return prevSelectedHTeamId;
                                            });
                                        }}
                                        value={selectedATeamId}
                                    >
                                        <option value="" disabled>
                                            {selectedATeam ? selectedATeam : "Select Away Team"}
                                        </option>
                                        {Teams.map((team) => (
                                            <option
                                                key={team.id}
                                                value={team.id}
                                                disabled={team.id === selectedHTeamId}
                                            >
                                                {team.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label htmlFor="venue">Venue:</label>
                                    <select
                                        name="venue"
                                        id="venue"
                                        // placeholder={selectedVenue}
                                        value={selectedVenueId}
                                        onChange={(e) => {
                                            setSelectedVenueId(e.target.value)
                                            // setSelectedVenue(e.target.value)
                                        }}
                                    >
                                        <option value="" disabled selected>
                                            {selectedVenue ? selectedVenue : "Select Home Team"}
                                        </option>
                                        {Venues.map((venue) => (
                                            <option value={venue.id}>
                                                {venue.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="date">Date:</label>
                                    <input type='date' name='date ' />
                                </div>
                                <div>
                                    <label htmlFor="time">Time:</label>
                                    <input type='time' name='time' />
                                </div>
                                <div>
                                    <label htmlFor="mainref">Main Refree:</label>
                                    <select
                                        name="mainref"
                                        id="mainref"
                                        value={selectedMRefereeId}
                                        // placeholder={selectedMReferee}
                                        onChange={(e) => {
                                            setSelectedMRefereeId(e.target.value)
                                            // setSelectedMReferee(e.target.placeholder)
                                        }}
                                    >
                                        <option value="" disabled selected>
                                            {selectedMReferee ? selectedMReferee : "Select Home Team"}
                                        </option>
                                        {mainReferee.map((mReferee) => (
                                            <option value={mReferee.id}>
                                                {mReferee.name}
                                            </option>
                                        ))}
                                    </select>
                                    {/* selected reffff */}
                                </div>
                                <div>
                                    <label htmlFor="line1ref">Line Refree 1:</label>
                                    <select
                                        name="line1ref"
                                        id="line1ref"
                                        value={selectedAReferee1Id}
                                        onChange={(e) => {
                                            setSelectedAReferee1Id(e.target.value);
                                            setSelectedAReferee2Id((prevSelectedAReferee2Id) => {
                                                if (prevSelectedAReferee2Id === e.target.value) {
                                                    return ''; // Reset selected line referee 2 if it matches line referee 1
                                                }
                                                return prevSelectedAReferee2Id;
                                            });
                                        }}
                                    >
                                        <option value="" disabled>
                                            {selectedAReferee1 ? selectedAReferee1 : "Select Line Referee 1"}
                                        </option>
                                        {assistantReferee.map((aReferee) => (
                                            <option
                                                key={aReferee.id}
                                                value={aReferee.id}
                                                disabled={aReferee.id === selectedAReferee2Id}
                                            >
                                                {aReferee.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="line2ref">Line Refree 2:</label>
                                    <select
                                        name="line2ref"
                                        id="line2ref"
                                        value={selectedAReferee2Id}
                                        onChange={(e) => {
                                            setSelectedAReferee2Id(e.target.value);
                                            setSelectedAReferee1Id((prevSelectedAReferee1Id) => {
                                                if (prevSelectedAReferee1Id === e.target.value) {
                                                    return ''; // Reset selected line referee 1 if it matches line referee 2
                                                }
                                                return prevSelectedAReferee1Id;
                                            });
                                        }}
                                    >
                                        <option value="" disabled>
                                            {selectedAReferee2 ? selectedAReferee2 : "Select Line Referee 2"}
                                        </option>
                                        {assistantReferee.map((aReferee) => (
                                            <option
                                                key={aReferee.id}
                                                value={aReferee.id}
                                                disabled={aReferee.id === selectedAReferee1Id}
                                            >
                                                {aReferee.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>


                                <button className='mainbutton' onClick={callPostEditedMatch}>Save</button>


                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );

}


export default EditMatch;