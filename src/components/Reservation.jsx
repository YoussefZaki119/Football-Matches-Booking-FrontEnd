import React, { Component } from "react";
import { Link, withRouter } from "react-router";
import ResponsiveAppBar from "./main/Header";

import Grid from "@material-ui/core/Grid";

import Col from "react-bootstrap/Col";
import post from "./post.json";
import { loginusername } from "./Login";

class Seatbooking extends React.Component {
  constructor() {
    super();
    this.state = {
      rows: 3,
      columns: 12,
      seats: [],
      seatReserved: [],
      seatSelected: post,
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

  onClickData(seat) {
    this.setState({
      seats: this.state.seats.map((s) =>
        s.id === seat ? { ...s, selected: !s.selected, reserved: !s.reserved } : s
      ),
    });
  }

  onReserveClick() {
    const { seats } = this.state;
    const seatReserved = seats
      .filter((seat) => seat.selected)
      .map((seat) => seat.id);

    this.setState({
      seats: this.state.seats.map((s) =>
        seatReserved.includes(s.id) ? { ...s, reserved: true, selected: false } : s
      ),
      seatReserved: [...this.state.seatReserved, ...seatReserved],
    });

    // Use history.push to navigate to the new page with selected values as URL parameters
    this.props.history.push({
      pathname: "/payment",
      search: `?selectedSeats=${encodeURIComponent(JSON.stringify(seatReserved))}`,
    });
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
    const { seats } = this.state;
    const columns = 12;
    const seatWidth = `${100 / columns}%`;

    return (
      <div>
        <ResponsiveAppBar />
        <div className="containerforseats">
          <h1>Seat Reservation System</h1>
          <Grid container spacing={0}>
            {seats.map((seat) => (
              <Grid item xs={12 / columns} style={{ width: seatWidth }} key={seat.id}>
                <button
                  onClick={() => this.onClickData(seat.id)}
                  disabled={seat.reserved}
                  className={seat.selected ? "selected" : seat.reserved ? "reserved" : ""}
                >
                  {seat.id}
                </button>
              </Grid>
            ))}
          </Grid>
          <button onClick={() => this.onReserveClick()}>
            Reserve
          </button>
        </div>
      </div>
    );
  }
}

// Use withRouter to inject history object into the component's props
export default Seatbooking;