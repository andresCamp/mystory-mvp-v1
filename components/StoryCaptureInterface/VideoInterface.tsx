import React from 'react'
import ControlModule from './ControlModule'
import Dexie from 'dexie';

interface VideoInterfaceProps {
    // db: Dexie;
    question: string;
    increaseQuestionIndex: ()=>void;
}

//mediaplayer webcam usage and recording to indexeddb
const VideoInterface: React.FC<VideoInterfaceProps> = ({question, increaseQuestionIndex}) => {
  return (
    <div>

        <ControlModule question={question} increaseQuestionIndex={increaseQuestionIndex}/>

      
    </div>
  )
}

export default VideoInterface
