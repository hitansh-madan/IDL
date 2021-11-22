import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/navbar.component";
import Templates from "./components/templates.component";
import Generate from "./components/generate.component";


function App() {
  return (
    <Router>
      <Navbar/>
      <div className = "container">
      <Route path = '/' exact component = {Templates} /> 
      <Route path = '/templates' exact component = {Templates} />
      <Route path = '/generate' component = {Generate} />
      </div>
    </Router>
  );
}

export default App;
