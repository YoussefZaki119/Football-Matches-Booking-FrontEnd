import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Cities from '../../cities.js';
import { Link } from 'react-router-dom';
import ManagerResponsiveAppBar from '../main/ManagerHeader.jsx';

function AddStadium(props) {
    const [newStadium, setNewStadium] = useState({
        name: '',
        city: '',
        googleMapLocation: '',
        seatingRows: 0,
        seatingColumns: 0,
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setNewStadium({ ...newStadium, [name]: value });
    };

    const postStadium = async () => {
        try {
            const response = await fetch('http://localhost:3000/stadiums', {
                method: 'post',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newStadium),
            });
            const stadium = await response.json();
            if(response.ok)
            {
                alert("Stadium Added Successfully")
            }
            else
            {
                alert("Something went wrong")
            }
            console.log('Stadium added:', stadium);
        } catch (error) {
            console.error('Error adding stadium:', error);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        postStadium();
    };

    return (
        <div>
            <ManagerResponsiveAppBar />
            <div id="DivMatchCreationcontainer">
                <div className="MatchCreationcontainer">
                    <h1>Add Stadium</h1>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="stadiumname">Stadium Name:</label>
                            <input
                                type="text"
                                name="name"
                                id="stadiumname"
                                value={newStadium.name}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="city">City:</label>
                            <select
                                id="city"
                                name="city"
                                required
                                value={newStadium.city}
                                onChange={handleInputChange}
                            >
                                <option value="">Select City</option>
                                {Cities.map((city) => (
                                    <option key={city.id} value={city.name}>
                                        {city.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="stadiumlocation">Location:</label>
                            <input
                                type="text"
                                name="googleMapLocation"
                                id="stadiumlocation"
                                value={newStadium.googleMapLocation}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="seatingRows">Seating Rows:</label>
                            <input
                                type="number"
                                name="seatingRows"
                                id="seatingRows"
                                value={newStadium.seatingRows}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="seatingColumns">Seating Columns:</label>
                            <input
                                type="number"
                                name="seatingColumns"
                                id="seatingColumns"
                                value={newStadium.seatingColumns}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <Button variant="contained" type="submit">
                            Add
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default AddStadium;
