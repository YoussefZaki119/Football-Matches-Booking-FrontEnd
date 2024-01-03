import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ResponsiveAppBar from "./main/Header";
import { itWillbeReseved } from "./FormWrapper";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import Grid from "@material-ui/core/Grid";
import { stadiumid } from "./Card";




let iWillBook = [];//ROWS 3 SEAT 5
let matchid = 0;
const Seatbooking = () => {
  const { id,username} = useParams();
  matchid = username;
  const [rows, setRows] = useState(3);
  const [columns, setColumns] = useState(12);
  const [seats, setSeats] = useState([]);
  const [seatReserved, setSeatReserved] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const navigate = useNavigate();
  const [temp, settemp] = useState([]);

  const [isFull,setIsFull]=useState(false);

  useEffect(() => {
    async function fetchMatches() {
      try {
        const response = await fetch("http://localhost:3000/stadiums?stadium=" + stadiumid, {
          method: "GET",
          mode: "cors",
        });
        const specificuser = await response.json();
        setRows(specificuser[0].seatingRows);
        setColumns(specificuser[0].seatingColumns);
      } catch (error) {
        console.error("Error fetching matches:", error);
      }
    }

    fetchMatches();
  }, []);
  useEffect(() => {
    async function fetchMatches() {
      try {
        const response = await fetch("http://localhost:3000/reservations/match/" + username, {
          method: "GET",
          mode: "cors",
        });
        const specificuser = await response.json();
        setSeatReserved(specificuser.map((seat) => seat.seatId));
        console.log(specificuser);
        
      } catch (error) {
        console.error("Error fetching matches:", error);
      }
    }

    fetchMatches();

  }, []);

  const postisfull = async () => {
    try {
        const matchId = matchid;  // Use the correct variable holding the match ID
        const response = await fetch(`http://localhost:3000/matches/${matchId}`, {
            method: "PUT",
            mode: "cors",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ "isFull": true }),  // Use "is_full" instead of "isFull"
        });

        if (response.ok) {
            console.log('Match updated successfully:', matchId);
        } else {
            console.error('Failed to update match:', matchId);
        }
    } catch (error) {
        console.error('Error updating match:', error);
    }
};

  

  useEffect(() => {
    const generatedSeats = [];
    for (let i = 1; i <= rows; i++) {
      for (let j = 1; j <= columns; j++) {
        const seatId = `Row ${i} Seat ${j}`;
        const isReserved = seatReserved.includes(seatId);
        
        const seat = {
          id: seatId,
          reserved: isReserved,
          selected: false,
        };
  
        generatedSeats.push(seat);
      }
    }
    const count=seatReserved.length;
    console.log("ana count",count);
    console.log("ana rows",rows);
    console.log("ana columns",columns);
    if(count>=rows*columns)
    {
      postisfull();
      
    }
    setSeats(generatedSeats);
  }, [rows, columns, seatReserved]);

  const onClickData = (index) => {
    setSeats((prevSeats) => {
      const updatedSeats = [...prevSeats];
      const currentSeat = updatedSeats[index];

      // Toggle only the selected state
      currentSeat.selected = !currentSeat.selected;

      // Update selectedSeats array based on the selected state
      const updatedSelectedSeats = currentSeat.selected
        ? [...selectedSeats, currentSeat]
        : selectedSeats.filter((seat) => seat.id !== currentSeat.id);
      iWillBook = updatedSelectedSeats;

      // Update the state
      setSelectedSeats(updatedSelectedSeats);

      return updatedSeats;
    });
  };

  const onReserveClick = () => {
    // Your reservation logic goes here
    navigate(`../payment/${id}`);
  };

  const renderReservedSeats = () => {
    return (
      <div>
        <h2>Reserved Seats:</h2>
        <ul>
          {seatReserved.map((reservedSeat) => (
            <li key={reservedSeat}>{reservedSeat}</li>
          ))}
        </ul>
      </div>
    );
  };


  const seatWidth = `${100 / columns}%`;

  return (
    <div>
      <ResponsiveAppBar />
      <div className="containerforseats">
        <h1>Seat Reservation System</h1>
        <Grid container spacing={0}>
          {seats.map((seat, index) => (
            <Grid item xs={12 / columns} style={{ width: seatWidth }} key={index}>
              <button
                onClick={() => onClickData(index)}
                disabled={seat.reserved}
                className={seat.selected ? "selected" : seatReserved.includes(seat.id) ? "reserved" : ""}
              >
                {seat.id}
              </button>
            </Grid>
          ))}
        </Grid>
        <button onClick={() => onReserveClick()}>
          <Link to="../payment">Reserve</Link>
        </button>
      </div>
    </div>
  );
};

export{matchid};
export { iWillBook };
export default Seatbooking;