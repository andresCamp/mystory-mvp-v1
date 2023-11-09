import React from 'react'
import NextButton from './buttons/NextButton'
import Dexie from 'dexie';
import RestartButton from './buttons/RestartButton';
import RecordButton from './buttons/RecordButton';

interface ControlModuleProps {
    // db: Dexie;
    question: string;
    increaseQuestionIndex: ()=>void;
}

const ControlModule: React.FC<ControlModuleProps> = ({question, increaseQuestionIndex}) => {
  return (
    <div>

        <RestartButton/>
        <RecordButton/>
        <NextButton question={question} increaseQuestionIndex={increaseQuestionIndex}/>
        
      
    </div>
  )
}

export default ControlModule
