import React from "react";
import StadiumIcon from '@mui/icons-material/Stadium';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';

function Card(props) {
  return (
    <div className="card">
      <div className="top">
      <div className="topleft">
      <img className="circle-img" src={props.image_url1} alt="avatar_img" />
        <h1 className="nameleft">{props.team1}</h1>
        </div>
       <div className="topright">
        <h1 className="nameright">{props.team2}</h1>
        <img className="circle-img" src={props.image_url2} alt="avatar_img" />
        </div>
      </div>
      <div className="middle">
        <div className="topleft">
          
            <h3> <CalendarMonthIcon/> {props.date} <br/> <AccessAlarmIcon/>{props.time}</h3>
    
            
        </div>
        <div className="topright">
          
            <h3><StadiumIcon/>{props.venue}</h3>
        </div>
      </div>
      <div className="bottom">
        <p className="info">{props.mainRefree}</p>
        <p className="info">{props.linesmen}</p>
      </div>
    </div>
  );
}

export default Card;