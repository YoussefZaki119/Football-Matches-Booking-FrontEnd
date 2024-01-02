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
    const [selectedHTeam, setSelectedHTeam] = useState('');
    const [selectedATeam, setSelectedATeam] = useState('');
    const [Venues, setVenues] = useState([]);
    const [selectedVenue, setSelectedVenue] = useState('');
    const [selectedMReferee, setSelectedMReferee] = useState('');
    const [selectedAReferee1, setSelectedAReferee1] = useState('');
    const [selectedAReferee2, setSelectedAReferee2] = useState('');
    const [mainReferee, setMainReferee] = useState([])
    const [assistantReferee, setAssistantReferee] = useState([])

    useEffect(() => {
        // Fetch options from the server when the component mounts
        fetch(`http://localhost:3000/matches?match=${id}`, {
            method: "get",
            mode: "cors"
        })
            .then((res) => res.json())
            .then((data) => {
                setMatch(data);
            })
            .catch((err) => console.log(err));
    }, [id]); // Include 'id' as a dependency to fetch data when 'id' changes
    async function callTeamAwayAPI() {
        fetch(`http://localhost:3000/teams/${match.teamAway}`, {
            method: "get",
            mode: "cors"
        })
            .then((res) => res.json())
            .then((res) => setSelectedATeam(res.name))
            .catch((err) => err);
    }
    useEffect(() => {
        callTeamAwayAPI();
    }, []);
    async function callTeamHomeAPI() {
        fetch(`http://localhost:3000/teams/${match.teamHome}`, {
            method: "get",
            mode: "cors"
        })
            .then((res) => res.json())
            .then((res) => setSelectedHTeam(res.name))
            .catch((err) => err);
    }
    useEffect(() => {
        callTeamHomeAPI();
    }, []);
    async function callMainRefereeAPI()
    {
        fetch(`http://localhost:3000/referees/${match.mainReferee}`, {
            method: "get",
            mode: "cors"
        })
            .then((res) => res.json())
            .then((res) => setSelectedMReferee(res.name))
            .catch((err) => err);
    }
    useEffect(() => {
        callMainRefereeAPI();
    }, []);
    async function callAssistantReferee1API()
    {
        fetch(`http://localhost:3000/referees/${match.lineRefereeLeft}`, {
            method: "get",
            mode: "cors"
        })
            .then((res) => res.json())
            .then((res) => setSelectedAReferee1(res.name))
            .catch((err) => err);
    }
    useEffect(() => {
        callAssistantReferee1API();
    },[]);
    async function callAssistantReferee2API()
    {
        fetch(`http://localhost:3000/referees/${match.lineRefereeRight}`, {
            method: "get",
            mode: "cors"
        })
            .then((res) => res.json())
            .then((res) => setSelectedAReferee2(res.name))
            .catch((err) => err);
    }
    useEffect(() => {
        callAssistantReferee2API();
    },[]);

    async function callVenueeAPI() {
        fetch(`http://localhost:3000/stadiums/${match.stadiumId}`, {
            method: "get",
            mode: "cors"
        })
            .then((res) => res.json())
            .then((res) => setSelectedVenue(res.name))
            .catch((err) => err);
    }
    useEffect(() => {
        callVenueeAPI();
    }, []);
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
    
    // let initialDate = "";
    // let initialTime = "";

    // // Check if match.time exists before extracting date and time
    // if (match?.time && match.time!="") {
    //     initialDate = match.time.slice(0, 10);
    //     initialTime = match.time.slice(11, 16);
    // }
    // const initialTime = initialDateTime.toISOString().split('T')[1].substring(0, 5);

    return (
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
                                value={selectedHTeam}
                                onChange={(e) => setSelectedHTeam(e.target.value)}
                            >

                                <option value="" disabled>
                                    {selectedATeam}
                                </option>
                                {Teams.map((team) => (
                                    <option value={team.name}>
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
                                    {selectedATeam}
                                </option>
                                {Teams.map((team) => (
                                    <option value={team.name}>
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
                                    {selectedVenue}
                                </option>
                                {Venues.map((venue) => (
                                    <option value={venue.name}>
                                        {venue.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="date">Date:</label>
                            <input type='date' name='date'/>
                        </div>
                        <div>
                            <label htmlFor="time">Time:</label>
                            <input type='time' name='time'/>
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
                                    {match.mainReferee}
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


                        <button className='mainbutton'>Save</button>


                    </form>
                </div>
            </div>
        </div>
    );

}


export default EditMatch;