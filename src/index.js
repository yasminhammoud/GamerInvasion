import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(

    <>

        <AuthProvider>

            <BrowserRouter>
                <App />
            </BrowserRouter>

        </AuthProvider>
    
    </>
  
);
