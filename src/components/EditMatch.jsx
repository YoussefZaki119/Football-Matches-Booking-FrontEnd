import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { dividerClasses } from "@mui/material";
import Cities from "../cities"
import { Link } from "react-router-dom";
import ManagerResponsiveAppBar from "./main/ManagerHeader.jsx";


function EditMatch(props) {
    const [Teams, setTeams] = useState([]);
    const [selectedHTeam, setSelectedHTeam] = useState('');
    const [selectedATeam, setSelectedATeam] = useState('');
    const [Venues, setVenues] = useState([]);
    const [selectedVenue, setSelectedVenue] = useState('');

    useEffect(() => {
        // Fetch options from the server when the component mounts
        fetch('http://localhost:8081/teams')
            .then((res) => res.json())
            .then((data) => setTeams(data))
            .catch((err) => console.log(err));
    }, []);

    useEffect(() => {
        // Fetch options from the server when the component mounts
        fetch('http://localhost:8081/stadiums')
            .then((res) => res.json())
            .then((data) => setVenues(data))
            .catch((err) => console.log(err));
    }, []);


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
                                    Select a Team
                                </option>
                                {Teams.map((team) => (
                                    <option value={team.Teamname}>
                                        {team.Teamname}
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
                                    <option value={team.Teamname}>
                                        {team.Teamname}
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
                                    <option value={venue.stadiumname}>
                                        {venue.stadiumname}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="date">Date:</label>
                            <input type='date' name='date' />
                        </div>
                        <div>
                            <label htmlFor="time">Time:</label>
                            <input type='time' name='time' />
                        </div>
                        <div>
                            <label htmlFor="mainref">Main Refree:</label>
                            <input type='text' name='mainref' />
                        </div>
                        <div>
                            <label htmlFor="line1ref">Line Refree 1:</label>
                            <input type='text' name='line1ref' />
                        </div>
                        <div>
                            <label htmlFor="line2ref">Line Refree 2:</label>
                            <input type='text' name='line2ref' />
                        </div>

                        <button className='mainbutton'>Save</button>


                    </form>
                </div>
            </div>
        </div>
    );

}


export default EditMatch;