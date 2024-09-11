import React from "react";
import ReactDOM from "react-dom";
import "../styles/index.css";
import Home from "./component/home.jsx";

let second = 0
setInterval(()=>{
    second++
    ReactDOM.render(<Home second={second} />, document.querySelector("#app"));
})
