import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import FootballStadiums from "../../stadiums";
import PlaceIcon from '@mui/icons-material/Place';
import { Stadium } from '@mui/icons-material';
import ResponsiveAppBar from "../main/Header";
import { Link, useNavigate } from "react-router-dom";

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}


function ManagerViewStadiums() {
    const [stad,setstad]=React.useState([ {id: '', name: '', city: '',googleMapLocation:'',seatingRows:'',seatingColumns:''} ])
    const navigate = useNavigate();
    function GoTo(){
        navigate("/addstadium");

    }
    async function logMovies() {
        const response = await fetch("http://localhost:3000/stadiums",
       { 
        method:"get",
        mode: "cors"});
        const stadiums = await response.json();
        return stadiums;
        
        console.log(stadiums);
    }
    const Farida= async () => {
        let response = await logMovies()
        setstad(response)

    }
    React.useEffect(() => {
        Farida()
    }, [])
    

    

    return (
        <div>
            <ResponsiveAppBar />
            <div className='stdContainer'>
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
                            {stad.map((Stadium) => (
                                <tr>
                                    <td>{Stadium.name}</td>
                                    <td className='cityandLocation'>{Stadium.city}</td>
                                    <td className='cityandLocation'><a href={Stadium.googleMapLocation} target='_blank'><PlaceIcon /></a></td>
                                </tr>
                            ))}

                        </tbody>
                    </table>
                </div>
                <button class="mainbutton " style= {{"width": "fit-content","margin-top": "2%"}} onClick={GoTo}>Add Stadium </button>

            </div>
        </div>
    );
}

export default ManagerViewStadiums;