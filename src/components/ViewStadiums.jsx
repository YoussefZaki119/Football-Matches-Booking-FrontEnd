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
import { Stadium } from '@mui/icons-material';
import ResponsiveAppBar from "./main/Header"

console.log("zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz")

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}


function ViewStadiums() {

    async function logMovies() {
        const response = await fetch("http://localhost:3000/stadiums");
        const stadiums = await response.json();
        console.log(stadiums);
    }
    useEffect(() => {
        
        logMovies();
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
                        {FootballStadiums.map((stadiums) => (
                            <tr>
                                <td>{stadiums.name}</td>
                                <td className='cityandLocation'>{stadiums.city}</td>
                                <td className='cityandLocation'><a href={stadiums.location} target='_blank'><PlaceIcon /></a></td>
                            </tr>
                        ))}

                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ViewStadiums;