import React from "react";
import './ProjectDetails.scss';
import { useParams } from "react-router-dom";
import { projects } from "../../data/data";

const ProjectDetails = () => {
    const param = useParams();
    const project = projects[param.key];

    return(
        <div>
            <h2>{project.title}</h2>
            <p>I am working on filling this out. Check back later!</p>
            <h1>:)</h1>
        </div>
    );
};

export default ProjectDetails;