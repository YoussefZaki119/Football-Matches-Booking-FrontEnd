import React from "react";
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Login from "./Login"
import Register from "./Register";

var IsRegistered = false;

function App() {
  return (
    <div>
      {IsRegistered ? <Login /> : <Register />}
    </div>
  );
}

export default App;
