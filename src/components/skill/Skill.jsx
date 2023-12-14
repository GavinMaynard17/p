import React from 'react';
import './Skill.scss';

const Skill = ({image, name}) => {

    const renderImage= () => {
        if(image){
            return <img className='skill-image' src={image} alt={name}></img>
        };
    };

    return (
        <div className='skill-container'>
            {renderImage()}
            <p>{name}</p>
        </div>
    );
};

export default Skill;