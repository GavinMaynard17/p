import React, { useState } from 'react';
import Bracket from './Bracket';

const BracketBuddy = () => {
    const [numParticipants, setNumParticipants] = useState(4);
    const [advancementMethod, setAdvancementMethod] = useState('choice');
    const [setupMode, setSetupMode] = useState(true);
    const [participantNames, setParticipantNames] = useState(new Array(numParticipants).fill(''));
    const [bracketProgress, setBracketProgress] = useState([]);
  
    const handleNumParticipantsChange = (value) => {
      if (value >= 4 && value <= 32) {
        setNumParticipants(value);
        setParticipantNames(new Array(value).fill(''));
        setBracketProgress([]);
      }
    };
  
    const handleAdvancementMethodChange = (method) => {
      setAdvancementMethod(method);
    };
  
    const handleSetupModeChange = () => {
      setSetupMode(!setupMode);
      if (!setupMode) {
        setBracketProgress([]);
      }
    };
  
    const handleNameChange = (index, newName) => {
      const updatedNames = [...participantNames];
      updatedNames[index] = newName;
      setParticipantNames(updatedNames);
    };
  
    const handleAdvance = (round, winnerIndex) => {
      if (setupMode) {
        const newBracketProgress = [...bracketProgress, { round, winnerIndex }];
        setBracketProgress(newBracketProgress);
      }
    };
  
    const generateBracketStructure = (numParticipants) => {
      const bracketStructure = [];
  
      // Calculate the number of rounds needed
      const numRounds = Math.ceil(Math.log2(numParticipants));
      
      let temp = numParticipants
      let matchNum = numParticipants-1
  
      // Generate rounds and matches
      for (let round = 0; round < numRounds; round++) {
        const roundMatches = [];
        let numMatchesInRound

        // Calculate the number of matches in this round
        if(temp%Math.pow(2, numRounds-1)===0){
            numMatchesInRound = Math.pow(2, numRounds - round - 1);
        } else {
            numMatchesInRound = temp%Math.pow(2, numRounds-1);
            temp -= temp%Math.pow(2, numRounds-1);
        }
        
        // Generate matches
        for (let matchIndex = 0; matchIndex < numMatchesInRound; matchIndex++) {
          const match = {
            participant1Index: null,
            participant2Index: null,
            matchNum: matchNum,
            winnerIndex: null
          };
          roundMatches.push(match);
          matchNum--;
        }
  
        bracketStructure.push(roundMatches);
      }
      
      return bracketStructure;
    };
  
    const bracketStructure = generateBracketStructure(numParticipants);

    console.log(bracketProgress);
  
    return (
      <div>
        <div>
          <label>Number of Participants:</label>
          <input type="number" value={numParticipants} onChange={(e) => handleNumParticipantsChange(parseInt(e.target.value))} min={4} max={32} />
          <input type="radio" id="4" name="numParticipants" value='4' checked={numParticipants === 4} onChange={() => handleNumParticipantsChange(4)} />
          <label htmlFor="4">4</label>
          <input type="radio" id="8" name="numParticipants" value='8' checked={numParticipants === 8} onChange={() => handleNumParticipantsChange(8)} />
          <label htmlFor="8">8</label>
          <input type="radio" id="16" name="numParticipants" value='16' checked={numParticipants === 16} onChange={() => handleNumParticipantsChange(16)} />
          <label htmlFor="16">16</label>
          <input type="radio" id="32" name="numParticipants" value='32' checked={numParticipants === 32} onChange={() => handleNumParticipantsChange(32)} />
          <label htmlFor="32">32</label>
        </div>
  
        <div>
          <label>Advancement Method:</label>
          <div>
            <input type="radio" id="byChoice" name="advancementMethod" value="choice" checked={advancementMethod === 'choice'} onChange={() => handleAdvancementMethodChange('choice')} />
            <label htmlFor="byChoice">By Choice</label>
            <input type="radio" id="byScore" name="advancementMethod" value="score" checked={advancementMethod === 'score'} onChange={() => handleAdvancementMethodChange('score')} />
            <label htmlFor="byScore">By Score</label>
          </div>
        </div>
  
        <div>
          <input type="checkbox" id="setupMode" checked={setupMode} onChange={handleSetupModeChange} />
          <label htmlFor="setupMode">Setup Mode</label>
        </div>

        <Bracket
          structure={bracketStructure}
          participantNames={participantNames}
          onNameChange={handleNameChange}
          onAdvance={handleAdvance}
          setupMode={setupMode}
          bracketProgress={bracketProgress}
        />
      </div>
    );
  };

export default BracketBuddy;

// THE IDEA
// 
// someone can input a number, generate a bracket accomodating that many elements. Max of 32
// -figure out how to generate bracket
// 
// give them following options: 
// input type (text or image)
// determine by: (score or choice)
// 
// if score, give a little box for the number
//
// if choice, when they tap on an element, it will win it's matchup
// -give ability to click on most previous round for specific element in case they misclicked
// --if they click on an element more than 1 round prior, it will erase all effected teams to that point
// -cannot click if there is no matchup
//
// can only input names/images if the element is in "first round" (idk)
//
// give them an option to move teams around, maybe a checkbox for "setup mode" 
// 
// would like to give them the option to save the current state as image (or pdf?)
