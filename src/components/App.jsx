import React from "react";
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Login from "./Login"
import Register from "./Register";
import Card from "./Card.jsx";
import Matches from "../matches.js";

var IsRegistered = true;
function createMatch(Matches) {
  return (
    <Card
      key={Matches.id}
      team1={Matches.team1}
      team2={Matches.team2}
      date={Matches.date}
      time={Matches.time}
      image_url1 ={Matches.image_url1}
      image_url2 ={Matches.image_url2}
      venue={Matches.venue}
      mainRefree={Matches.mainRefree}
      linesmen={Matches.linesmen}
     
    />
  );
}
function App() {
  return (
    // <div>
    //   {IsRegistered ? <Login /> : <Register />}
    // </div>
    <div>
      {Matches.map(createMatch)}
      
</div>
  );
}

export default App;
