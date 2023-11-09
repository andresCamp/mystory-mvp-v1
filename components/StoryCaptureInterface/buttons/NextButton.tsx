import React from 'react'
import { db } from '../db';

interface NextButtonProps {
    question: string;
    increaseQuestionIndex: ()=>void;
}

const NextButton: React.FC<NextButtonProps> = ({question, increaseQuestionIndex}) => {

   



  return (
    <div onClick={increaseQuestionIndex}>
      Next Question
    </div>
  )
}

export default NextButton
