import React, { Component } from "react";
import { Link } from "react-router-dom";
import ResponsiveAppBar from "./main/Header";
import { itWillbeReseved } from "./FormWrapper";
import { useParams } from "react-router-dom";

import Grid from "@material-ui/core/Grid";


let iWillBook=[];



console.log("dsjofjas");
console.log(itWillbeReseved);


class Seatbooking extends React.Component {
  constructor() {
    super();
    this.state = {
      rows: 3,
      columns: 12,
      seats: [],
      seatReserved: itWillbeReseved,
      selectedSeats: [], // New property to store selected seats
    };
  }
  
  
  componentDidMount() {
    this.generateSeats();
  }

  generateSeats() {
    const { rows, columns } = this.state;
    const seats = [];

    for (let i = 1; i <= rows; i++) {
      for (let j = 1; j <= columns; j++) {
        const seat = {
          id: `Row ${i} Seat ${j}`,
          reserved: false,
          selected: false,
        };
        seats.push(seat);
      }
    }
    
    this.setState({ seats });
  }

  onClickData(index) {
    this.setState((prevState) => {
      const updatedSeats = [...prevState.seats];
      const currentSeat = updatedSeats[index];
  
      // Toggle only the selected state
      currentSeat.selected = !currentSeat.selected;
  
      // Update selectedSeats array based on the selected state
      const selectedSeats = currentSeat.selected
        ? [...prevState.selectedSeats, currentSeat]
        : prevState.selectedSeats.filter((seat) => seat.id !== currentSeat.id);
        iWillBook=selectedSeats;
      return { seats: updatedSeats, selectedSeats };
    });
  }



  onReserveClick() {
  //   const { seats } = this.state;
  //   const seatReserved = seats
  //     .filter((seat) => seat.selected)
  //     .map((seat) => seat.id);

  //   this.setState({
  //     seats: this.state.seats.map((s) =>
  //       seatReserved.includes(s.id) ? { ...s, reserved: true, selected: false } : s
  //     ),
  //     seatReserved: [...this.state.seatReserved, ...seatReserved],
  //   });
  }

  renderReservedSeats() {
    const { seatReserved } = this.state;
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
  }
 


  render() {
    const { seats, seatReserved } = this.state;
    const columns = 12;
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
                  onClick={() => this.onClickData(index)}
                  disabled={seat.reserved}
                  className={seat.selected ? "selected" : seatReserved.includes(seat.id) ? "reserved" : ""}
                >
                  {seat.id}
                </button>
              </Grid>
            ))}
          </Grid>
          <button onClick={() => this.onReserveClick()}><Link to="../payment">Reserve</Link></button>
        </div>
        
      </div>
    );
  }
  
}

// Use withRouter to inject history object into the component's props
export {iWillBook};
export default Seatbooking;