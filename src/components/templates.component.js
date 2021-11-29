import React, {Component} from "react";
import { BrowserRouter as Router , Link, Route} from "react-router-dom";

import CreateTemplate from "./create-template.component";
import AllTemplates from "./all-templates.component";
export default class Templates extends Component {

    render(){
        return(
            <Router>
            <div className="btn-group my my-5 " role="group">
                <Link to="/templates/create-template" type="button" className="btn btn-primary border">Create Template</Link>
                <Link to="/templates/all-templates" type="button" className="btn btn-primary border">All Templates</Link>
            </div>

            <Route path = '/templates/' exact component = {CreateTemplate} /> 
            <Route path = '/templates/create-template' component = {CreateTemplate} />
            <Route path = '/templates/all-templates' component = {AllTemplates} />

            </Router>
        )
    }
}
