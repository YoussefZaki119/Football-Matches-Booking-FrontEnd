import React, { useState } from "react";
import Login from "./Login";
import Register from "./Register";
import Main from "../main/Main";
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";


function App2() {
    const [isRegistered, setIsRegistered] = useState(true);

    function notRegistered() {
        setIsRegistered(false);
    }

    function registered() {
        setIsRegistered(true);
    }
    const router = createBrowserRouter([
        {
            path: "/",
            element: <div className="App">
                {isRegistered ? (
                    <Login onChecked={notRegistered} />
                ) : (
                    <Register onChecked={registered} />
                )}
            </div>,
        },
        {
            path: "main",
            element: <Main />

        }
    ]);

    return (
        <RouterProvider router={router} />

    );
}

export default App2;