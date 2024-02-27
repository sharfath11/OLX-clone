import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { firebaseContext } from "./Components/Context/Context";
import Firebase from "./Components/Firebase/Config";
import Context from "./Components/Context/Context";

ReactDOM.render(
 
    <firebaseContext.Provider value={{ Firebase }}>
       <BrowserRouter>
        <Context>
        <App />
        </Context>
        </BrowserRouter>
     
    </firebaseContext.Provider>,
  document.getElementById("root")
);
