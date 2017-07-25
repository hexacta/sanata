import React from "react";
import ReactDOM from "react-dom";
import { Route, BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import glamorous from "glamorous";

const Body = glamorous.body({
  margin: "0",
  padding: "0",
  fontFamily: "sans-serif"
});

ReactDOM.render(
  <Body>
	<Router>
	  <Route path="/:username?" component={App} />
	</Router>
  </Body>,
  document.getElementById("root")
);
