import React from "react";
import StadiumIcon from '@mui/icons-material/Stadium';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import PersonIcon from '@mui/icons-material/Person';
import ControlledOpenSelect from"./dropdownMenu"
function Card(props) {
  return (
    <div className="cardbody">
      <div className="card">
        <div className="top">
          <div className="topleft">
            {/* <img className="circle-img" src={props.image_url1} alt="avatar_img" /> */}
            <ControlledOpenSelect/>
          </div>
          <div className="topright">
          <ControlledOpenSelect/>
            {/* <img className="circle-img" src={props.image_url2} alt="avatar_img" /> */}
          </div>
        </div>
        <div className="middle">
          <div className="leftmiddle">
            <div className="info"><span className="refrees">Main Refree:</span>{props.mainRefree}</div>
            <div className="info"><span className="refrees">Lines Men:</span>{props.linesmen}</div>
          </div>
          <div className="middlemiddle">
            <div id="date"> <CalendarMonthIcon /> {props.date} </div>
            <div id="time"><AccessAlarmIcon />{props.time}</div>
          </div>
          <div className="rightmiddle">
            <h3><StadiumIcon />{props.venue}</h3>
          </div>
        </div>
        <div className="bottom">

        </div>
      </div>
    </div>
  );
}

export default Card;