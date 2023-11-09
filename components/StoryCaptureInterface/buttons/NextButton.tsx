import React from 'react'
import { db } from '../db';

interface NextButtonProps {
    question: string;
    increaseQuestionIndex: ()=>void;
}

const NextButton: React.FC<NextButtonProps> = ({question, increaseQuestionIndex}) => {

    // db.videos.add({
    //     question: questions[questionIndex],
    //     blob: blob
    // }})

    async function addVideo() {
        try{
            await db.videos.add({
                question: question,
                // blob: blob
            })
            increaseQuestionIndex();
        }
        catch(e){
            console.log(e);
        }
    }

    



  return (
    <div onClick={increaseQuestionIndex}>
      Next Question
    </div>
  )
}

export default NextButton
