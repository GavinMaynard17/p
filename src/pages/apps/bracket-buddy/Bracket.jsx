import React, { useEffect, useState } from 'react';
import './Bracket.scss';
import Matchup from './Matchup';

const Bracket = ({ structure, setupMode, advanceType, updateName}) => {
  const [currentStructure, setCurrentStructure] = useState(structure);
  const [roundHeight, setRoundHeight] = useState(0);

  useEffect(() => {
    setCurrentStructure(structure);
    // Calculate round height based on the number of matches in the first round
    if (structure.length > 0) {
      const numMatchesInFirstRound = structure[0].length;
      const matchHeight = 50; // Adjust this value as needed
      const roundPadding = 20; // Adjust this value as needed
      const newRoundHeight = numMatchesInFirstRound * (matchHeight + roundPadding) * 1.1 ;
      setRoundHeight(newRoundHeight);
    }
  }, [structure]);

  const handleWinnerChange = (matchNum, participant) => {
    const newStructure = currentStructure.map(round =>
      round.map(match => {
        if (match.matchNum === matchNum) {
          return { ...match, winnerName: participant };
        }
        return match;
      })
    );
    setCurrentStructure(newStructure);
  };

  const handleNameChange = (matchNum, index, participant) => {
    let currMatchIndex;
    const newStructure = currentStructure.map(round =>
      round.map((match, matchIndex) => {
        if (match.matchNum === matchNum) {
          currMatchIndex = matchIndex;
          if (index === 0) return { ...match, participant1Name: participant };
          else return { ...match, participant2Name: participant };
        }
        return match;
      })
    );
    setCurrentStructure(newStructure);
    updateName(currMatchIndex, index, participant);
  };

  return (
    <div className="bracket">
      {currentStructure.map((round, roundIndex) => (
        <div key={roundIndex} className="round">
          <h3>Round {roundIndex + 1}</h3>
          <div className='round-matches' style={{ justifyContent: 'space-around', height: roundHeight }}>
            {round.map((match, matchIndex) => (
              <div key={matchIndex} className="match">
                <Matchup
                  round={roundIndex}
                  matchNum={match.matchNum}
                  structure={currentStructure}
                  handleWinnerChange={handleWinnerChange}
                  handleNameChange={handleNameChange}
                  isSetup={setupMode}
                  advanceType={advanceType}
                />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Bracket;
