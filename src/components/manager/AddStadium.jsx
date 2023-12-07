import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { dividerClasses } from "@mui/material";
import Cities from "../../cities.js"
import { Link } from "react-router-dom";

import ManagerResponsiveAppBar from "../main/ManagerHeader.jsx";


function AddStadium(props) {


    return (
        <div>

            <ManagerResponsiveAppBar />

            <div id='DivMatchCreationcontainer'>
                <div className='MatchCreationcontainer'>
                    <h1>Add Stadium</h1>
                    <div>
                        <label htmlFor="stadiumname">Stadium Name:</label>
                        <input type='text' name='stadiumname' id='stadiumname' />
                    </div>
                    <div>
                        <label htmlFor="city">City:</label>
                        <select id="city" name="city" placeholder="city" required>
                            <option hidden>City</option>
                            {Cities.map(city => <option value={city.id}>{city.name}</option>)}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="stadiumlocation">Location:</label>
                        <input type='text' name='stadiumlocation' id='stadiumlocation' />
                    </div>
                    <button className='mainbutton'>Add</button>
                </div>
            </div>

        </div>

    );

}
export default AddStadium;