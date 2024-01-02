import React, { useState, useEffect } from "react";
import Cities from "../cities"
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { loginusername } from "./Login";
import ResponsiveAppBar from "./main/Header";
//import { husername } from "./main/Header";


function EditData() {
    const { id } = useParams();
    //let username="john_doe"
    console.log("dsfa");
    //console.log(husername);
    const [user, setuser] = useState({});
    const [password, setPassword] = useState("");
    const [fnmae, setfname] = useState("");
    const [lname, setlname] = useState("");
    const [birthdate, setbirthdate] = useState("");
    const [gender, setgender] = useState("");
    const [city, setcity] = useState("");
    const [address, setaddress] = useState("");
    useEffect(() => {
        async function logMovies() {
            const response = await fetch("http://localhost:3000/users?user=" + id, {
                method: "get",
                mode: "cors"
            });


            const specificuser = await response.json();
            //console.log(specificuser);
            setuser(specificuser);
            let bd = specificuser.birthDate ? specificuser.birthDate.substring(0, 10) : '';
            console.log(bd);
            setPassword(specificuser.password);
            setfname(specificuser.firstName);
            setlname(specificuser.lastName);
            setbirthdate(bd);
            setgender(specificuser.gender);
            setcity(specificuser.city);
            setaddress(specificuser.address);



        }


        logMovies();

    }, []);

    function handleSubmit(event) {
        event.preventDefault(); // Prevent default form submission
        const form = event.target;
        if (form.checkValidity()) {
            // If the form is valid, call updateUser

            updateUser();
          } else {
            // Handle invalid form case (e.g., show error message)
            console.log("Form is not valid");
        }
    }

    function updateUser() {

        const updatedUserFan = {
            password: password,
            firstName: fnmae,
            lastName: lname,
            birthDate: birthdate,
            gender: gender,
            city: city,
            address: address
        };

        let confirmationMessage = '';


        confirmationMessage = 'Do you want to Save?';



        const result = window.confirm(confirmationMessage);

        if (result) {
            fetch(`http://localhost:3000/users/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedUserFan),
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error(`Failed to update your data: ${response.statusText}`);
                    }
                    return response.json();
                })
                .then(() => {
                    // Update the local state to reflect the change
                    setuser((prevUser) => ({ ...prevUser, ...updatedUserFan }));
                    console.log("User data updated");
                })
                .catch((error) => {
                    console.error("Error updating your data:", error);
                });
        }
    }




    return (
        <div>
            <ResponsiveAppBar />
        <div id='DivMatchCreationcontainer'>
       
            <div className="MatchCreationcontainer">


                <h1>Edit Profile</h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label className="editdatalabels" htmlFor="password">Password:</label>
                        <input name="password" placeholder="Password" required minLength="8" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div>
                        <label className="editdatalabels" htmlFor="fname">First Name:</label>
                        <input type="text" name="fname" placeholder="First Name" required value={fnmae} onChange={(e) => setfname(e.target.value)} />
                    </div>
                    <div>
                        <label className="editdatalabels" htmlFor="lname">Last Name:</label>
                        <input type="text" name="lname" placeholder="Last Name" required value={lname} onChange={(e) => setlname(e.target.value)} />
                    </div>
                    <div>
                        <label className="editdatalabels" htmlFor="birthdate">Birthdate:</label>
                        <input type="date" title="pick your birthdate" name="birthdate" required value={birthdate} onChange={(e) => setbirthdate(e.target.value)} />
                    </div>
                    <div>
                        <label className="editdatalabels" htmlFor="gender">Gender:</label>
                        <select id="gender" name="gender" placeholder="Gender" required value={gender} onChange={(e) => setgender(e.target.value)}>
                            <option hidden>Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="others">Others</option>
                        </select>
                    </div>
                    <div>
                        <label className="editdatalabels" htmlFor="city">City:</label>
                        <select id="city" name="city" placeholder="city" required value={city} onChange={(e) => setcity(e.target.value)}>
                            <option value={city}>
                                {city}
                            </option>
                            {Cities.map(city => <option value={city.name}>{city.name}</option>)}
                        </select>
                    </div>
                    <div>
                        <label className="editdatalabels" htmlFor="address">Last Name:</label>
                        <input type="text" name="address" placeholder="Address (optional)" value={address} onChange={(e) => setaddress(e.target.value)} />
                    </div>


                    <button className="mainbutton">Save</button>

                </form>
            </div>
        </div>
        </div>
    );

}


export default EditData;