import React from "react";

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
        <div className="leftmiddle">
            <h3>{props.venue}</h3>
        </div>
        <div className="rigtmiddle">
            <h3>{props.date}</h3>
            <h3>{props.time}</h3>
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