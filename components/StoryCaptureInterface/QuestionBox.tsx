//accepts a question item and returns a question box component
import React from 'react'

interface QuestionBoxProps {
    question: string;
}

const QuestionBox: React.FC<QuestionBoxProps> = ({question}) => {
  return (
    <div>
      <h1>{question}</h1>
    </div>
  )
}

export default QuestionBox
