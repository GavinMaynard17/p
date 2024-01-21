import React from "react";
import './ProjectDetails.scss';
import { useParams } from "react-router-dom";
import { projects } from "../../data/data";

const ProjectDetails = () => {
    const param = useParams();
    const project = projects[param.key];

    const renderSkills = () => {
        return (
            <div className="skills-wrapper">
                {project.skills.map((skill, index) => (
                    <div key={index} className="skill-rectangle">
                        {skill}
                    </div>
                ))}
            </div>
        );
    };

    return (
        <div className="project-details-details-container">
            <h2 className="project-title">{project.title}</h2>
            <div className="project-content-container">
                <div className="project-details-image-container">
                    <img className="project-details-image" src={project.image} alt={project.title} />
                </div>
                <div className="project-details-description-container">
                    <p className="project-details-description">{project.description}</p>
                    <h3>Skills Used:</h3>
                    {renderSkills()}
                    <div className="project-link">
                        {project.link ? (
                            <a href={project.link} target="_blank" rel="noopener noreferrer">
                                Project Link
                            </a>
                        ) : (
                            <p>Link was lost</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectDetails;