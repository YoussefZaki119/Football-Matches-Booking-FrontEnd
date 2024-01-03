import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import FootballStadiums from "../stadiums";
import PlaceIcon from '@mui/icons-material/Place';
import DeleteIcon from '@mui/icons-material/Delete';
import ResponsiveAppBar from "./main/Header";
import { useState, useEffect } from 'react';
import { mainusername } from './main/Main';
import { useParams } from 'react-router-dom';

function ViewRes() {
    const { id } = useParams();
    const [reservations, setReservations] = useState([]);
    const [Matches, setMatches] = useState([]);
    const [TeamA, setTeamA] = useState([]);
    const [TeamH, setTeamH] = useState([]);
    const [Stadiums, setStadiums] = useState([]);

    const fetchMatches = async () => {
        try {
            const response = await fetch("http://localhost:3000/reservations/user/" + id, {
                method: "GET",
                mode: "cors",
            });
            const specificuser = await response.json();
            setReservations(specificuser);
        } catch (error) {
            console.error("Error fetching matches:", error);
        }
    };

    const deleteUser = async (deletedUsername) => {
        const response = await fetch(`http://localhost:3000/reservations/${deletedUsername}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            alert('Ticket Refunded successfully');
            // Refresh the user list after successful deletion
            fetchMatches();
        } else {
            alert('Failed to refunded ticket');
        }
    };

    useEffect(() => {
        fetchMatches();
    }, []);


    const postisfull = async (matchId) => {
        try {
            const response = await fetch(`http://localhost:3000/matches/${matchId}`, {
                method: "PUT",
                mode: "cors",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ "isFull": false }),
            });
    
            if (response.ok) {
                console.log(`Match ${matchId} updated successfully`);
            } else {
                console.error(`Failed to update match ${matchId}`);
            }
        } catch (error) {
            console.error('Error updating match:', error);
        }
    };
    
    
    

    function ondelete(reservationid,matchid) {
        postisfull(matchid);
        deleteUser(reservationid);
    }

    useEffect(() => {
        async function fetchMatches() {
            try {
                const response = reservations.map(reserve=> fetch("http://localhost:3000/matches?match="+reserve.matchId, {
                    method: "GET",
                    mode: "cors"
                }).then(res => res.json())
                );
                const data = await Promise.all(response);
                setMatches(data);
            } catch (error) {
                console.error('Error fetching matches:', error);
            }
        }

        fetchMatches();
    }, [reservations]);


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
                
                
                const teamsA = await Promise.all(fetchPromisesA);
                const teamsH = await Promise.all(fetchPromisesH);
                const stadiums = await Promise.all(fetchPromisesStadium);
                setTeamA(teamsA);
                setTeamH(teamsH);
                setStadiums(stadiums);            
            } catch (error) {
                console.error('Error fetching teams:', error);
            }
        }

        fetchTeams();
    }, [Matches]);


    return (
        <div>
            <ResponsiveAppBar />
            <div className='stadiumtable'>
                <table>
                    <thead>
                        <tr>
                            <th>Match</th>
                            <th>Stadium</th>
                            <th className='cityandLocation'>Seat</th>
                            <th className='cityandLocation'>Refund</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reservations.map((reservation, index) => {
                            const matchIndex = index < Matches.length ? index : 0; // Ensure match data exists
                            const teamA = TeamA[matchIndex] || {};
                            const teamH = TeamH[matchIndex] || {};
                            const stadium = Stadiums[matchIndex] || {};

                            return (
                                <tr key={index}>

                                    <td>{teamA.name} vs {teamH.name}</td>
                                    
                                    <td>{stadium.name}</td>
                                    <td className='cityandLocation'>{reservation.seatId}</td>
                                    <td className='cityandLocation roleanddeleteicon' onClick={() => ondelete(reservation.id,reservation.matchId)}><DeleteIcon /></td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ViewRes;
