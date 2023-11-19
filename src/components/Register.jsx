import React from "react";
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { dividerClasses } from "@mui/material";
import Cities from "../cities"

function Register() {
    return (
        <div className="regcontainer">
            <h1>Welcome</h1>
            <form>
                <input name="username" placeholder="UserName" required />
                <input name="password" placeholder="Password" required />
                <input type="text" name="fname" placeholder="First Name" required />
                <input type="text" name="lname" placeholder="Last Name" required />
                <input type="email" name="email" placeholder="Email" required />
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



                <button className="mainbutton">Register</button>
                <br />
                <a className="secondarybutton" id="login">Login</a>
                <a className="secondarybutton" id="guest">Continue as a Guest</a>
            </form>
        </div>
    );

}


export default Register;