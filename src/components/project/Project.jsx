import React from 'react';
import './Project.scss';
import { Link } from 'react-router-dom';

const Project = ({ project, onSkillClick }) => {

  const renderSkills = () => {
    return (
      <div className="skills-wrapper">
        {project.skills.map((skill, index) => (
          <div key={index} className="skill-rectangle" onClick={() => onSkillClick(skill)}>
            {skill}
          </div>
        ))}
      </div>
    );
  };

  return (

      <div className="project-box">        
        <Link to={`/projects/${project.key}`} style={{ textDecoration: 'none', color: 'black' }}>
          <img className="project-image" src={project.image} alt={project.title} />
        </Link>
        <div className="project-details">
          <Link to={`/projects/${project.key}`} style={{ textDecoration: 'none', color: 'black' }}>
            <h3>{project.title}</h3>
          </Link>
          <p className="project-description">{project.description}</p>
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

    
  );
};

export default Project;
