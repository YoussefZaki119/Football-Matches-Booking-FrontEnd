import React from "react";
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { dividerClasses } from "@mui/material";
import Cities from "../cities"
import { Link, useNavigate } from "react-router-dom";

function Register(props) {
    const navigate = useNavigate();
    const [formData, setFormData] = React.useState({
        userName: "",
        password: "",
        firstName: "",
        lastName: "",
        email: "",
        birthDate: "",
        gender: "",
        city: "",
        address: "",
        role: "",
        status: ""
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        const formattedValue = name === 'birthDate' ? new Date(value).toISOString() : value;
        let updatedFormData = { ...formData, [name]: formattedValue };

        if (name === 'role') {
            updatedFormData = {
                ...updatedFormData,
                role: value,
                status: value === 'Manager' ? 'pending' : 'approved'
            };
        }

        setFormData(updatedFormData);
    };



    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:3000/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                alert("Registration successful :) ");
                console.log("Registration successful :) ");
                if (formData.role === "Manager") {
                    props.onChecked()

                }
                else {
                    navigate(`main/${formData.userName}`)
                }

            } else {
                alert("Registration failed. Please try again :(");


            }
        } catch (error) {
            console.error("Error during registration:", error);
        }

    };
    return (
        <div id='DivRegcontainer'>

            <div className="Regcontainer">

                <h1 className="regsettings">Welcome</h1>
                <form onSubmit={handleRegister}>
                    <div>
                        <label className="regsettings" htmlFor="userName">UserName:</label>
                        <input name="userName" placeholder="UserName" required onChange={handleInputChange} />
                    </div>
                    <div>
                    <label className="regsettings" htmlFor="password">Password:</label>
                    <input name="password" placeholder="Password" required minLength="8" onChange={handleInputChange} />
                    </div>
                    <div>
                    <label className="regsettings" htmlFor="firstName">First Name:</label>
                    <input type="text" name="firstName" placeholder="First Name" required onChange={handleInputChange} />
                    </div>
                    <div>
                    <label className="regsettings" htmlFor="lastName">Last Name:</label>
                    <input type="text" name="lastName" placeholder="Last Name" required onChange={handleInputChange} />
                    </div>
                    <div>
                    <label className="regsettings" htmlFor="email">Email:</label>
                    <input type="email" name="email" placeholder="Email" required onChange={handleInputChange} />
                    </div>
                    <div>
                    <label className="regsettings" htmlFor="birthDate">BirthDate:</label>
                    <input type="date" title="pick your birthdate" name="birthDate" required onChange={handleInputChange} />
                    </div>
                    <div>
                    <label className="regsettings" htmlFor="gender">Gender:</label>
                    <select id="gender" name="gender" placeholder="Gender" required onChange={handleInputChange}>
                        <option hidden>Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="others">Others</option>
                    </select>
                    </div>
                    <div>
                    <label className="regsettings" htmlFor="role">Role:</label>
                    <select id="role" name="role" placeholder="role" required onChange={handleInputChange}>
                        <option hidden>role</option>
                        <option key="Fan" value="Fan">Fan</option>
                        <option key="Manager" value="Manager">Manager</option>
                    </select>
                    </div>
                    <div>
                    <label className="regsettings" htmlFor="city">City:</label>
                    <select id="city" name="city" placeholder="city" required onChange={handleInputChange}>
                        <option hidden>City</option>
                        {Cities.map(city => <option key={city.id} value={city.id}>{city.name}</option>)}
                    </select>
                    </div>
                    <div>
                    <label className="regsettings" htmlFor="address">Address:</label>
                    <input type="text" name="address" placeholder="Address (optional)" onChange={handleInputChange} />
                    </div>
                    <button className="mainbutton" type="submit" >Register</button>
                    <br />
                    <a className="secondarybutton" id="login" onClick={props.onChecked}>Login</a>
                    <a className="secondarybutton"><Link to="guest">Continue as a Guest</Link></a>
                </form>
            </div>
        </div>
    );
}

export default Register;
