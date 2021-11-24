import React, { Component, useEffect } from "react";
import TempleteService from "../services/templete";
import { Link } from "react-router-dom";
const TemplatesList = props => {
    const [templates, setTemplates] = React.useState([]);

    const retrieveTemplates = () => {
        TempleteService.getAll().then((response) => {
            console.log(response.data.templates);
            setTemplates(response.data.templates);
        }).catch((error) => {
            console.log(error);
        });
    };
    useEffect(() => {
        retrieveTemplates();
    }, []);
    return (

        <div>
        <button onClick={() => {retrieveTemplates()}}>Refresh</button>
        </div>
    );
}
export default TemplatesList;