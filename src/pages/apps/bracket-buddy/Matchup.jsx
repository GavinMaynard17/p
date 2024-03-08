import React, { useEffect, useState } from 'react';
import './Matchup.scss';
import { participantFrom } from '../../../data/data';

const Matchup = ({ round, structure, matchNum, handleWinnerChange, handleNameChange, isSetup, advanceType}) => {
  const [participant1Name, setParticipant1Name] = useState('');
  const [participant2Name, setParticipant2Name] = useState('');
  const [selectedParticipant, setSelectedParticipant] = useState('');

  
  useEffect(() => {
    // console.log(isSetup);
    updateParticipantNames();
  }, [round, structure, matchNum]);// Update participant names when structure or round changes

  const updateParticipantNames = () => {
    if (round !== 0) {
      // Update participant names based on winner from previous matches
      const participant1Num = participantFrom[matchNum - 1].participant1From;
      const participant2Num = participantFrom[matchNum - 1].participant2From;

      const winner1 = findWinnerName(participant1Num);
      const winner2 = findWinnerName(participant2Num);

      setParticipant1Name(winner1);
      setParticipant2Name(winner2);
    } else {
      // Update participant names directly from structure

      for (let i = 0; i < structure.length; i++) {
        for (let j = 0; j < structure[i].length; j++) {
          if (structure[i][j].matchNum === matchNum) {
            setParticipant1Name(structure[i][j].participant1Name);
            setParticipant2Name(structure[i][j].participant2Name);
            setSelectedParticipant(structure[i][j].winnerName);
          }
        }
      }
    }
  };
  
  const handleCheckboxChange = (participant) => {
    if (selectedParticipant !== participant) {
      handleWinnerChange(matchNum, participant);
      setSelectedParticipant(participant); 
    } else {
      handleWinnerChange(matchNum, null);
      setSelectedParticipant(''); 
    }
  };

  const handleTyping = (index, participant) => {
    handleNameChange(matchNum, index, participant);
    setParticipant1Name(index === 0 ? participant : participant1Name);
    setParticipant2Name(index === 1 ? participant : participant2Name);
  };

  const findWinnerName = (matchNum) => {
    for (let i = 0; i < structure.length; i++) {
      for (let j = 0; j < structure[i].length; j++) {
        if (structure[i][j].matchNum === matchNum) { 

          return structure[i][j].winnerName;
        }
      }
    }
    return ''; // Default to empty string if winner not found
  };

  const renderMatch = () => {
    if (round === 0) {
      return (
        <div className="outer-box">
          <div className={`participant-1 ${selectedParticipant === participant2Name ? 'disabled' : ''}`}>
            <input
              className={`participant-input ${selectedParticipant === participant2Name ? 'disabled' : ''}`}
              placeholder="Participant's name"
              value={participant1Name}
              onChange={(e) => handleTyping(0, e.target.value)}
              disabled={!isSetup}
            />
            {renderDecider(1)}
          </div>
          <div className={`participant-2 ${selectedParticipant === participant1Name ? 'disabled' : ''}`}>
            <input
              className={`participant-input ${selectedParticipant === participant1Name ? 'disabled' : ''}`}
              placeholder="Participant's name"
              value={participant2Name}
              onChange={(e) => handleTyping(1, e.target.value)}
              disabled={!isSetup}
            />
            {renderDecider(2)}
          </div>
          <div className="to-line"></div>
        </div>
      );
    } else {
      const isParticipant1Empty = participant1Name ? participant1Name.trim() === '' : true;
      const isParticipant2Empty = participant2Name ? participant2Name.trim() === '' : true;
      const isEitherEmpty = isParticipant1Empty || isParticipant2Empty

      return (
        <div className="outer-box">
          <div className="participant-1">
            <p className={`participant-input ${selectedParticipant === participant2Name ? 'disabled' : ''}`}>{participant1Name}</p>
            {renderDecider(1)}
          </div>
          <div className="participant-2">
            <p className={`participant-input ${selectedParticipant === participant1Name ? 'disabled' : ''}`}>{participant2Name}</p>
            {renderDecider(2)}
          </div>
        </div>
      );
    }
  };

  const renderLines = () => {
      if(round===0){
        return (
          <div>
            <div className="to-line"></div>
          </div>
        );//first round
      } else if(round>=0 && round===structure.length-1){
        return (
          <div>
            <div className="from-line"></div>
          </div>
        );//last round
      } else {
        return (
          <div>
            <div className="to-line"></div>
            <div className="from-line"></div>
          </div>
        );//middle rounds
      }  
  };//horizontle lines coming from matches

  const renderVertLines = () => {
    switch (round) {
      case 0:
        if(matchNum%2 === 1){
          return (
            <div className='vert-line' style={{height: '76px', top: '50%'}}/>
          );
        } else break;
        
      case 1:
        if(matchNum%2 === 1 && round!==structure.length-1){
          return (
            <div className='vert-line' style={{height: '155px', top: '50%'}}/>
          );
        } else break;
      case 2:
        if(matchNum%2 === 1 && round!==structure.length-1){
          return (
            <div className='vert-line' style={{height: '309px', top: '50%'}}/>
          );
        } else break;
      case 3:
        if(matchNum%2 === 1 && round!==structure.length-1){
          return (
            <div className='vert-line' style={{height: '617px', top: '50%'}}/>
          );
        } else break;
      default:
        break;
    }
  };//Verticle lines between matches

  const renderDecider = (participant) => {
    switch (advanceType) {
      case 'choice':
        if (participant === 1){
          if(round === 0){
            return(
              <input
                  className={`checkbox ${selectedParticipant === participant2Name ? 'disabled' : ''}`}
                  type="checkbox"
                  checked={selectedParticipant === participant1Name}
                  onChange={() => handleCheckboxChange(participant1Name)}
                  disabled={isSetup}
                />
            );
          } else {  
            const isParticipant1Empty = participant1Name ? participant1Name.trim() === '' : true;
            const isParticipant2Empty = participant2Name ? participant2Name.trim() === '' : true;
            const isEitherEmpty = isParticipant1Empty || isParticipant2Empty
            return (
              <input
                className="checkbox"
                type="checkbox"
                checked={selectedParticipant === participant1Name}
                onChange={() => handleCheckboxChange(participant1Name)}
                disabled={isEitherEmpty || (!isParticipant1Empty && !isParticipant2Empty && selectedParticipant === 'participant2')}
              />
            );
          }
        } else {
          if(round === 0){
            return(
              <input
                  className={`checkbox ${selectedParticipant === participant1Name ? 'disabled' : ''}`}
                  type="checkbox"
                  checked={selectedParticipant === participant2Name}
                  onChange={() => handleCheckboxChange(participant2Name)}
                  disabled={isSetup}
                />
            );
          } else {  
            const isParticipant1Empty = participant1Name ? participant1Name.trim() === '' : true;
            const isParticipant2Empty = participant2Name ? participant2Name.trim() === '' : true;
            const isEitherEmpty = isParticipant1Empty || isParticipant2Empty
            return (
              <input
                className="checkbox"
                type="checkbox"
                checked={selectedParticipant === participant2Name}
                onChange={() => handleCheckboxChange(participant2Name)}
                disabled={isEitherEmpty || (!isParticipant2Empty && !isParticipant1Empty && selectedParticipant === 'participant1')}
              />
            );
          }
        }
        

      case 'picture':
        if(round === 0){
          return (
            <Camera/>
          );
        } else break;
    
      default:
        return (
          <div>

          </div>
        );
    }
  };

  return (
    <div className='matchup-container'>
      {renderMatch()}
      {renderLines()}
      {renderVertLines()}
    </div>
  );
};

const Camera = () => {
  return (
    <div className='camera-container'>
      <div className='camera-flash'/>
      <div className='camera-body'>
        <div className='camera-lens'/>  
      </div>
    </div>
  );
};

export default Matchup;