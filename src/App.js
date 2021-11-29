import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/navbar.component";
import Templates from "./components/templates.component";
import Generate from "./components/generate.component";
import FullLabel from "./components/full-label";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container">
        <Route path="/" exact component={Templates} />
        <Route path="/templates" exact component={Templates} />
        <Route path="/generate" component={Generate} />
      </div>
      <Route path="/label" component = {FullLabel}/>
    </Router>
  );
}

export default App;
