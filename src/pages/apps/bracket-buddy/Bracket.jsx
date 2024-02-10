import React, { useState } from 'react';
import './Bracket.scss';
import Matchup from './Matchup';

const Bracket = ({ structure, setupMode, onAdvance }) => {
  const initialParticipantNames = structure.reduce((acc, round, roundIndex) => {
    round.forEach((_, matchIndex) => {
      acc[`${roundIndex}-${matchIndex}`] = '';
    });
    return acc;
  }, {});

  const [participantNames, setParticipantNames] = useState(initialParticipantNames);

  const handleNameChange = (roundIndex, matchIndex, participantIndex) => (event) => {
    const newParticipantNames = { ...participantNames };
    newParticipantNames[`${roundIndex}-${matchIndex + participantIndex}`] = event.target.value;
    setParticipantNames(newParticipantNames);
  };

  console.log(structure)

  return (
    <div className="bracket">
      {structure.map((round, roundIndex) => (
        <div key={roundIndex} className="round">
          <h3>Round {roundIndex+1}</h3>
          <div className='round-matches'>
            {round.map((match, matchIndex) => (
              <div key={matchIndex} className="match">
                {/* <input
                  type="text"
                  value={participantNames[`${roundIndex}-${matchIndex}0`]}
                  onChange={handleNameChange(roundIndex, matchIndex, 0)}
                  disabled={!setupMode || match.winnerIndex !== null}
                />
                <span>vs</span>
                <input
                  type="text"
                  value={participantNames[`${roundIndex}-${matchIndex}1`]}
                  onChange={handleNameChange(roundIndex, matchIndex, 1)}
                  disabled={!setupMode || match.winnerIndex !== null}
                />
                {!setupMode && match.winnerIndex !== null && (
                  <button onClick={() => onAdvance(roundIndex, match.winnerIndex)}>Advance</button>
                )} */}
                <p>{match.matchNum}</p>
                <Matchup round={roundIndex} matchNum={match.matchNum} structure={structure}/>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Bracket;