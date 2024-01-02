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
            alert('User deleted successfully');
            // Refresh the user list after successful deletion
            fetchMatches();
        } else {
            alert('Failed to delete user');
        }
    };

    useEffect(() => {
        fetchMatches();
    }, []);

    return (
        <div>
            <ResponsiveAppBar />
            <div className='stadiumtable'>
                <table>
                    <thead>
                        <tr>
                            <th>Stadium Name</th>
                            <th className='cityandLocation'>City</th>
                            <th className='cityandLocation'>Location</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reservations.map((reservation, index) => (
                            <tr key={index}>
                                <td>{reservation.seatId}</td>
                                <td className='cityandLocation'>{reservation.matchId}</td>
                                <td className='cityandLocation roleanddeleteicon' onClick={() => deleteUser(reservation.id)}><DeleteIcon /></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ViewRes;
