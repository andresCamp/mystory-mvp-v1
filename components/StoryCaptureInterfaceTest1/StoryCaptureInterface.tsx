'use client'
import React from 'react'
import QuestionBox from './QuestionBox';
import Dexie from 'dexie';
import useVideoRecorder from './useVideoRecorder';

//questions array
const questions = ['What is your name?', 'How old are you?', 'what is your favorite color?'];

//handles state for story capture interface
const StoryCaptureInterface = () => {

    //state to keep track of question index
    const [questionIndex, setQuestionIndex] = React.useState(0);
    
    const {
        isRecording,
        videoList,
        startRecording,
        stopRecording,
        deleteVideo
    } = useVideoRecorder(questions[questionIndex]);
    
    
    //arrow function that increase question index
    const increaseQuestionIndex = () => {
        setQuestionIndex(questionIndex + 1);
    }
    
    return (
        <div>

            <QuestionBox question={questions[questionIndex]}/>

        </div>
    )
}

export default StoryCaptureInterface
