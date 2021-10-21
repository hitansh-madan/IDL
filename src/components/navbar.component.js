import React, {Component} from "react";
import {Link} from 'react-router-dom';

export default class Navbar extends Component {

    render(){
        return(
            <nav className = "navbar navbar-dark bg-dark navbar-expand-lg px-5">
                <Link to = "/" className = "navbar-brand"> 
                    <img src="https://www.logicearth.com/wp-content/uploads/2020/06/toppng.com-usage-of-cookies-bayer-logo-535x528-1.png" width="40" height="40" className="d-inline-block align-top mx-3" alt=""></img>
                    <div className = "d-inline-block align-middle">Integrated Digital Label</div> 
                </Link>
                <div className = "collapse navbar-collapse">
                <ul className="navbar-nav ">
                    <li className="navbar-item">
                        <Link to = "/templates" className = "nav-link">Templates</Link>
                    </li>
                    <li className="navbar-item">
                        <Link to='/generate' className = "nav-link">Generate</Link>
                    </li>
                </ul>
                </div>
            </nav>
        )
    }
}
