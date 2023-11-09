'use client'
import React from 'react'
import QuestionBox from './QuestionBox';
import Dexie from 'dexie';
import VideoInterface from './VideoInterface';

//questions array
const questions = ['What is your name?', 'How old are you?'];

//handles state for story capture interface
const StoryCaptureInterface = () => {
    //state to keep track of question index
    const [questionIndex, setQuestionIndex] = React.useState(0);

    //arrow function that increase question index
    const increaseQuestionIndex = () => {
        setQuestionIndex(questionIndex + 1);
    }


    //init indexie db & pass to video module
    // const db = new Dexie('MyVideoDB');
    // db.version(1).stores({
    //     videos: '++id, question, blob'
    // });




    return (
        <div>

            <QuestionBox question={questions[questionIndex]}/>
            <VideoInterface question={questions[questionIndex]} increaseQuestionIndex={increaseQuestionIndex}/>

        </div>
    )
}

export default StoryCaptureInterface
