import React, { useState, useEffect } from 'react';
import './Matchup.scss';
import { teamFrom } from '../../../data/data';

const Matchup = ({ round, structure, matchNum }) => {
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [team1Name, setTeam1Name] = useState('');
  const [team2Name, setTeam2Name] = useState('');
  

  useEffect(() => {
    if (round !== 0) {
      const team1Num = teamFrom[matchNum - 1].team1From;
      const team2Num = teamFrom[matchNum - 1].team2From;

      for (let i = 0; i < structure.length; i++) {
        for (let j = 0; j < structure[i].length; j++) {
          if (structure[i][j].matchNum === team1Num) {
            setTeam1Name(structure[i][j].teamName);
          }
          if (structure[i][j].matchNum === team2Num) {
            setTeam2Name(structure[i][j].teamName);
          }
        }
      }
    }
  }, [round, structure, matchNum]);

  const handleCheckboxChange = (team) => {
    
    if (selectedTeam !== team) {
      setSelectedTeam(team);
    } else {
      setSelectedTeam(null);
    }
    console.log(selectedTeam);
  };

  const renderMatch = () => {
    if (round === 0) {
      return (
        <div className="outer-box">
          <div className={`team-1 ${selectedTeam === team2Name ? 'disabled' : ''}`}>
            <input
              className={`team-input ${selectedTeam === team2Name ? 'disabled' : ''}`}
              placeholder="Participant's name"
              value={team1Name}
              onChange={(e) => setTeam1Name(e.target.value)}
            />
            <input
              className={`checkbox ${selectedTeam === team2Name ? 'disabled' : ''}`}
              type="checkbox"
              checked={selectedTeam === team1Name}
              onChange={() => handleCheckboxChange(team1Name)}
            />
          </div>
          <div className={`team-2 ${selectedTeam === team1Name ? 'disabled' : ''}`}>
            <input
              className={`team-input ${selectedTeam === team1Name ? 'disabled' : ''}`}
              placeholder="Participant's name"
              value={team2Name}
              onChange={(e) => setTeam2Name(e.target.value)}
            />
            <input
              className={`checkbox ${selectedTeam === team1Name ? 'disabled' : ''}`}
              type="checkbox"
              checked={selectedTeam === team2Name}
              onChange={() => handleCheckboxChange(team2Name)}
            />
          </div>
        </div>
      );
    } else {
      const isTeam1Empty = team1Name ? team1Name.trim() === '' : true;
      const isTeam2Empty = team2Name ? team2Name.trim() === '' : true;

      return (
        <div className="outer-box">
          <div className="team-1">
            <p className="team-name">Winner of {team1Name}</p>
            <input
              className="checkbox"
              type="checkbox"
              checked={selectedTeam === 'team1'}
              onChange={() => handleCheckboxChange('team1')}
              disabled={isTeam1Empty || (!isTeam1Empty && !isTeam2Empty && selectedTeam === 'team2')}
            />
          </div>
          <div className="team-2">
            <p className="team-name">Winner of {team2Name}</p>
            <input
              className="checkbox"
              type="checkbox"
              checked={selectedTeam === 'team2'}
              onChange={() => handleCheckboxChange('team2')}
              disabled={isTeam2Empty || (!isTeam2Empty && !isTeam1Empty && selectedTeam === 'team1')}
            />
          </div>
        </div>
      );
    }
  };

  return <>{renderMatch()}</>;
};

export default Matchup;