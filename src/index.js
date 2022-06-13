import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { UserAuthContextProvider } from "./contexts/UserAuthContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(

    <>

        <UserAuthContextProvider>

            <BrowserRouter>
                <App />
            </BrowserRouter>

        </UserAuthContextProvider>
    
    </>
  
);
