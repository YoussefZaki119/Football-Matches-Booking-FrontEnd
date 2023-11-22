import React from "react";
import Card from "./cards";
import Teams from "../teams.js";
import Matches from "../matches.js";

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
  <div>
      {Matches.map(createMatch)}
      
</div>
  );
}

export default App;