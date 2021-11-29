import React, { Component, useEffect } from "react";
import TempleteService from  "..//services/templates";
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
            {
                templates.map((template) => {
                    return (
                        <div class="card">
                            <div class="card-header">
                              Product Id:{template.productId}
                            </div>
                            <div class="card-body">
                                <h5 class="card-title">Product Name:{template.name}</h5>
                                <p class="card-text">Product Category:{template.category}</p>
                                <a href="#" class="btn btn-primary">Generate Template</a>
                            </div>
                        </div>
                    );
                })
            }
        </div>
    );
}
export default TemplatesList;