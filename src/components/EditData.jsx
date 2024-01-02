import React from "react";
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { dividerClasses } from "@mui/material";
import Cities from "../cities"
import { Link } from "react-router-dom";
import ManagerResponsiveAppBar from "./main/ManagerHeader.jsx";
import { loginusername } from "./Login";
function EditData(props) {
    const [user, setuser] = useState({});
    useEffect(() => {
        
        async function logMovies() {
            const response = await fetch("http://localhost:3000/users?users=" + loginusername , {
              method: "get",
              mode: "cors"
            });
      
      
            const specificuser = await response.json();
            //console.log(specificuser);
            setuser(specificuser[0].firstName);
            console.log(user);
          
           
      
            // if (specificuser.role === "Fan") {
            //   navigate("main");
            // } else if (specificuser.role === "Manager") {
            //   navigate("manager");
            // }
        
        }
      
       
        logMovies();
       
      }, []);
    return (
        
        <div className="regcontainer">
      

            <h1>Edit Profile</h1>
            <form>
                <input name="password" placeholder="Password" required minLength="8" value={user.password}/>
                <input type="text" name="fname" placeholder="First Name" required value={user.firstName}/>
                <input type="text" name="lname" placeholder="Last Name" required value={user.lastName} />
                <input type="date" title="pick your birthdate" name="birthdate" value="Birthdate" required />
                <select id="gender" name="gender" placeholder="Gender" required value={user.gender}>
                    <option hidden>Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="others">Others</option>
                </select>
                <select id="city" name="city" placeholder="city" required value={user.city}>
                    <option hidden>City</option>
                    {Cities.map(city => <option value={city.id}>{city.name}</option>)}
                </select>
                <input type="text" name="addres" placeholder="Address (optional)" value={address} />



                <button className="mainbutton">Save</button>

            </form>
        </div>
    );

}


export default EditData;