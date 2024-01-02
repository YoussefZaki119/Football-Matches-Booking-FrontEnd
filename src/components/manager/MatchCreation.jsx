import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { dividerClasses } from "@mui/material";
import Cities from "../../cities.js"
import { Link } from "react-router-dom";
import ManagerResponsiveAppBar from "../main/ManagerHeader.jsx";


function MatchCreation(props) {
    const [Teams, setTeams] = useState([]);
    const [selectedHTeam, setSelectedHTeam] = useState(0);
    const [selectedATeam, setSelectedATeam] = useState(0);
    const [time, setTime] = useState("")
    const [date, setDate] = useState("")
    const [selectedMReferee, setSelectedMReferee] = useState(0);
    const [selectedAReferee1, setSelectedAReferee1] = useState(0);
    const [selectedAReferee2, setSelectedAReferee2] = useState(0);
    const [Venues, setVenues] = useState([]);
    const [mainReferee, setMainReferee] = useState([])
    const [assistantReferee, setAssistantReferee] = useState([])
    const [selectedVenue, setSelectedVenue] = useState(0);
    const [newMatch, setNewMatch] = useState({ teamAway: "", teamHome: "", stadiumId: "", time: "", mainReferee: "", lineRefereeRight: "", lineRefereeLeft: "", isFull: false })
    async function callPostMatch() {
        setNewMatch({ teamAway: selectedATeam, teamHome: selectedHTeam, stadiumId: selectedVenue, time: `${date}T${time}:00Z`, mainReferee: selectedMReferee, lineRefereeRight: selectedAReferee2, lineRefereeLeft: selectedAReferee1, isfull: false })
        console.log(newMatch)
        console.log(selectedHTeam)
        const response = await fetch("http://localhost:3000/matches", {
            method: "post",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newMatch),
        })
        if (response.ok) {
            alert("Match Created Successfully");
        } else {
            alert("Match Creation Failed");
        }
        // Handle the parsed JSON data
        
        // Perform additional actions with the data if neeed
    }

    function postMatch(e)
     {
        e.preventDefault();
        let isTeamsValid=true;
        let isRefValid=true;
        if (selectedHTeam === selectedATeam) {
            alert("Home team and Away team must be different");
            isTeamsValid = false
        }
       if(selectedAReferee1===selectedAReferee2)
       {
              alert("Assistant Referees must be different");
              isRefValid=false
       }
       if(isTeamsValid&&isRefValid)
       {
        callPostMatch();
       }
    }
    

    async function callTeamAPI() {
        fetch("http://localhost:3000/teams", {
            method: "get",
            mode: "cors"
        })
            .then((res) => res.json())
            .then((res) => setTeams(res))
            .catch((err) => err);
    };
    useEffect(() => {
        callTeamAPI();
    }, []);
    async function callVenueAPI() {
        fetch("http://localhost:3000/stadiums", {
            method: "get",
            mode: "cors"
        })
            .then((res) => res.json())
            .then((res) => setVenues(res))
            .catch((err) => err);
    }
    useEffect(() => {
        callVenueAPI();
    }, []);

    async function callRefereeAPI() {
        fetch("http://localhost:3000/referees/main", {
            method: "get",
            mode: "cors"
        })
            .then((res) => res.json())
            .then((res) => setMainReferee(res))
            .catch((err) => err);
    }
    useEffect(() => {
        callRefereeAPI();
    }, []);
    async function callAssisRefAPI() {
        fetch("http://localhost:3000/referees/assistant", {
            method: "get",
            mode: "cors"
        })
            .then((res) => res.json())
            .then((res) => setAssistantReferee(res))
            .catch((err) => err);
    }
    useEffect(() => {
        callAssisRefAPI();
    }, []);
    return (
        <div>
            <ManagerResponsiveAppBar />
            <div id='DivMatchCreationcontainer'>
                <div className="MatchCreationcontainer">
                    <h1>Create Match</h1>
                    <form>
                        <div>
                            <label htmlFor="homeTeam">Home Team:</label>
                            <select
                                name="homeTeam"
                                id="homeTeam"
                                value={selectedHTeam}
                                onChange={(e) => setSelectedHTeam(e.target.value)}
                            >
                                <option value="" disabled>
                                    Select a Team
                                </option>
                                {Teams.map((team) => (
                                    <option value={team.id}>
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
                                value={selectedATeam}
                                onChange={(e) => setSelectedATeam(e.target.value)}
                            >
                                <option value="" disabled>
                                    Select a Team
                                </option>
                                {Teams.map((team) => (
                                    <option value={team.id}>
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
                                value={selectedVenue}
                                onChange={(e) => setSelectedVenue(e.target.value)}
                            >
                                <option value="" disabled>
                                    Select a Venue
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
                            <input type='date' name='date' onChange={(e) => setDate(e.target.value)} />
                        </div>
                        <div>
                            <label htmlFor="time">Time:</label>
                            <input type='time' name='time' onChange={(e) => setTime(e.target.value)} />
                        </div>
                        <div>
                            <label htmlFor="mainref">Main Refree:</label>
                            <select
                                name="mainref"
                                id="mainref"
                                value={selectedMReferee}
                                onChange={(e) => setSelectedMReferee(e.target.value)}
                            >
                                <option value="" disabled>
                                    Select a Refree
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
                                value={selectedAReferee1}
                                onChange={(e) => setSelectedAReferee1(e.target.value)}
                            >
                                <option value="" disabled>
                                    Select a Left Line Man
                                </option>
                                {assistantReferee.map((aReferee) => (
                                    <option value={aReferee.id}>
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
                                value={selectedAReferee2}
                                onChange={(e) => setSelectedAReferee2(e.target.value)}
                            >
                                <option value="" disabled>
                                    Select a Right Line Man
                                </option>
                                {assistantReferee.map((aReferee) => (
                                    <option value={aReferee.id}>
                                        {aReferee.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <button className='mainbutton' onClick={postMatch}>Create</button>


                    </form>
                </div>
            </div>
        </div>
    );

}


export default MatchCreation;