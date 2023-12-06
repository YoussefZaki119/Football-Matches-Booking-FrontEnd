import React from "react";
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { dividerClasses } from "@mui/material";
import Cities from "../cities"
import { Link } from "react-router-dom";
import ManagerResponsiveAppBar from "./main/ManagerHeader.jsx";
function EditData(props) {
    return (
        
        <div className="regcontainer">
        <ManagerResponsiveAppBar />
            <h1>Edit Profile</h1>
            <form>
                <input name="password" placeholder="Password" required minLength="8" />
                <input type="text" name="fname" placeholder="First Name" required />
                <input type="text" name="lname" placeholder="Last Name" required />
                <input type="date" title="pick your birthdate" name="birthdate" value="Birthdate" required />
                <select id="gender" name="gender" placeholder="Gender" required>
                    <option hidden>Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="others">Others</option>
                </select>
                <select id="city" name="city" placeholder="city" required>
                    <option hidden>City</option>
                    {Cities.map(city => <option value={city.id}>{city.name}</option>)}
                </select>
                <input type="text" name="addres" placeholder="Address (optional)" />



                <button className="mainbutton">Save</button>

            </form>
        </div>
    );

}


export default EditData;