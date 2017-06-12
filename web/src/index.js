import React from "react";
import ReactDOM from "react-dom";
import {Route, HashRouter} from "react-router-dom"
import App from "./App";
import "./index.css";

ReactDOM.render(
    <HashRouter>
        <Route path="/:username?" component={App}/>
    </HashRouter>
    , document.getElementById("root"));
